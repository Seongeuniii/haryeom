pipeline {
    agent any
    tools {
        nodejs "nodejs20.11.0"   
    }

    environment {
        clientPath = 'client/'
        gitBranch = 'develop'
        gitCredential = 'gitlab-demise1426'
        gitUrl = 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A807'
        dockerCredential = 'demise1426-docker'
        latestImage = 'demise1426/haryeom-fe:latest'
        NEXT_PUBLIC_API_SERVER = credentials('NEXT_PUBLIC_API_SERVER')
        NEXT_PUBLIC_REST_API_KEY = credentials('NEXT_PUBLIC_REST_API_KEY')
        NEXT_PUBLIC_REDIRECT_URI = credentials('NEXT_PUBLIC_REDIRECT_URI')
        NEXT_PUBLIC_CHAT_SERVER = credentials('NEXT_PUBLIC_CHAT_SERVER')
        NEXT_PUBLIC_SIGNALING_SERVER = credentials('NEXT_PUBLIC_SIGNALING_SERVER')
        MATTERMOST_ENDPOINT = credentials('mattermost_endpoint')
        MATTERMOST_CHANNEL = credentials('mattermost_channel')
    }

    stages {
        stage('Check Changes') {
            steps {
                script {
                    // GitLab webhook payload contains information about the changes
                    def changes = currentBuild.rawBuild.changeSets.collect { changeLogSet ->
                        changeLogSet.collect { changeSet ->
                            changeSet.getAffectedFiles()
                        }
                    }.flatten()

                    // Check if changes include client directory
                    def clientChanged = changes.any { it.path.startsWith(clientPath) }

                    if (clientChanged) {
                        echo 'Changes detected in client directory. Running the pipeline.'
                    } else {
                        echo 'No changes in client directory. Skipping the pipeline.'
                        currentBuild.result = 'ABORTED'
                        error 'No changes in client directory. Skipping the pipeline.'
                    }
                }
            }
        }
        stage('Git Clone') {
            steps {
                git branch: gitBranch,
                        credentialsId: gitCredential,
                        url: gitUrl
            }
        }
        stage('Node Build') {
            steps {
                dir('client') {
                    sh "echo 'NEXT_PUBLIC_API_SERVER=${NEXT_PUBLIC_API_SERVER}' > .env"
                    sh "echo 'NEXT_PUBLIC_REST_API_KEY=${NEXT_PUBLIC_REST_API_KEY}' >> .env"
                    sh "echo 'NEXT_PUBLIC_REDIRECT_URI=${NEXT_PUBLIC_REDIRECT_URI}' >> .env"
                    sh "echo 'NEXT_PUBLIC_CHAT_SERVER=${NEXT_PUBLIC_CHAT_SERVER}' >> .env"
                    sh "echo 'NEXT_PUBLIC_SIGNALING_SERVER=${NEXT_PUBLIC_SIGNALING_SERVER}' >> .env"
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Docker Image Build & DockerHub Push') {
            steps {
                dir('client') {
                    script {
                        docker.withRegistry('', dockerCredential) {
                            // Build and push Docker image using docker-compose
                            sh "docker-compose build"
                            sh "docker-compose push"
                        }
                    }
                }
            }
        }
        stage('Service Stop & Service Remove') {
            steps {
                dir('client') {
                    sh 'docker stop haryeom-fe'
                    sh 'docker rm haryeom-fe'
                    sh "docker rmi $latestImage"
                }
            }
        }
        stage('DockerHub Pull & Service Start') {
            steps {
                dir('client') {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (
                    color: 'good', 
                    message: "Client Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                    endpoint: MATTERMOST_ENDPOINT, 
                    channel: MATTERMOST_CHANNEL
                )
            }
        }
        failure {
        	script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (
                    color: 'danger', 
                    message: "Client Build Failure: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                    endpoint: MATTERMOST_ENDPOINT, 
                    channel: MATTERMOST_CHANNEL
                )
            }
        }
    }
}
