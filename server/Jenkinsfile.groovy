pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout 소스 코드
                checkout scm
            }
        }
        stage('Check Changes') {
            steps {
                script {
                    // GitLab webhook payload contains information about the changes
                    def changes = currentBuild.rawBuild.changeSets.collect { it.items }.flatten()

                    // Check if changes include server directory
                    // def serverChanged = changes.any { it.path.startsWith('server/') }

                    def serverChanged = changes.any {
                        if (it.path.startsWith('server/')) {
                            echo "Change detected in: ${it.path}"
                            true
                        } else {
                            echo "else Change detected in: ${it.path}"
                            false
                        }
                    }

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
                git branch: 'develop',
                        credentialsId: 'gitlab-demise1426',
                        url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A807'
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
    }
}
