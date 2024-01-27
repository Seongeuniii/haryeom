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
                    sh 'docker-compose down'
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
}
