pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  parameters {
    choice(name: 'RUN_MODE', choices: ['single', 'all', 'parallel'], description: 'Режим запуска тестов')
  }

  stages {
    stage('Checkout and install') {
      steps {
        checkout scm
        dir('cinema') {
          script {
            if (isUnix()) {
              withEnv(["CYPRESS_CACHE_FOLDER=${env.WORKSPACE}/.cypress-cache"]) {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
                sh 'npx cypress install'
                sh 'npx cypress verify'
              }
            } else {
              withEnv(["CYPRESS_CACHE_FOLDER=${env.WORKSPACE}\\.cypress-cache"]) {
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install'
                bat 'npx cypress install'
                bat 'npx cypress verify'
              }
            }
          }
        }
      }
    }

    stage('Run tests') {
      steps {
        dir('cinema') {
          script {
            def command = params.RUN_MODE == 'parallel'
              ? 'npm run cy:parallel'
              : (params.RUN_MODE == 'single'
                ? "npm run cy:run:electron"
                : 'npm run cy:run')

            if (isUnix()) {
              withEnv(["CYPRESS_CACHE_FOLDER=${env.WORKSPACE}/.cypress-cache"]) {
                sh command
              }
            } else {
              withEnv(["CYPRESS_CACHE_FOLDER=${env.WORKSPACE}\\.cypress-cache"]) {
                bat command
              }
            }
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'cinema/cypress/screenshots/**/*, cinema/cypress/videos/**/*', allowEmptyArchive: true
    }
  }
}
