pipeline {
    agent any
    tools {
        gradle "gradle"
    }

    environment {
        serverPath = 'server/'
        gitBranch = 'develop'
        gitCredential = 'gitlab-demise1426'
        gitUrl = 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A807'
        dockerCredential = 'demise1426-docker'
        latestImage = 'demise1426/haryeom-be:latest'
        MATTERMOST_ENDPOINT = credentials('mattermost_endpoint')
        MATTERMOST_CHANNEL = credentials('mattermost_channel')
    }

    stages {
//        stage('Checkout') {
//            steps {
//                // Checkout 소스 코드
//                checkout scm
//            }
//        }
        stage('Check Changes') {
            steps {
                script {
                    // GitLab webhook payload contains information about the changes
//                    def changes = currentBuild.rawBuild.changeSets.collect { it.items }.flatten()
                    def changes = currentBuild.rawBuild.changeSets.collect { changeLogSet ->
                        changeLogSet.collect { changeSet ->
                            changeSet.getAffectedFiles()
                        }
                    }.flatten()

                    // Check if changes include server directory
                     def serverChanged = changes.any { it.path.startsWith(serverPath) }

//                    def serverChanged = changes.any {
//                        if (it.path.startsWith('server/')) {
//                            echo "Change detected in: ${it.path}"
//                            true
//                        } else {
//                            echo "else Change detected in: ${it.path}"
//                            false
//                        }
//                    }

                    if (serverChanged) {
                        echo 'Changes detected in server directory. Running the pipeline.'
                    } else {
                        echo 'No changes in server directory. Skipping the pipeline.'
                        currentBuild.result = 'ABORTED'
                        error 'No changes in server directory. Skipping the pipeline.'
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
        stage('Jar Build') {
            steps {
                dir('server') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar'
                }
            }
        }
        stage('Docker Image Build & DockerHub Push') {
            steps {
                dir('server') {
                    script {
                        docker.withRegistry('', dockerCredential) {
                            // Use the credentials for Docker Hub login
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
                dir('server') {
                    sh 'docker stop haryeom-be'
                    sh 'docker rm haryeom-be'
                    sh "docker rmi $latestImage"
                }
            }
        }
        stage('DockerHub Pull & Service Start') {
            steps {
                dir('server') {
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
                    message: "Server Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
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
                    message: "Server Build Failure: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                    endpoint: MATTERMOST_ENDPOINT, 
                    channel: MATTERMOST_CHANNEL
                )
            }
        }
    }
}
