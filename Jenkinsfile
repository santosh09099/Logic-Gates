pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git repository
                git url: 'https://github.com/username/repository.git', branch: 'main'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image from the Dockerfile
                    docker.build('my-static-website')
                }
            }
        }
        stage('Deploy to Docker') {
            steps {
                script {
                    // Stop and remove existing container, if it exists
                    sh 'docker stop static-website || true'
                    sh 'docker rm static-website || true'

                    // Run the Docker container
                    sh 'docker run -d --name static-website -p 8080:80 my-static-website'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful! Your site is running at http://localhost:8080'
        }
        failure {
            echo 'Deployment failed. Please check the logs for errors.'
        }
    }
}
