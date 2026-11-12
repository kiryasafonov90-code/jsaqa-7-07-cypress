pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  parameters {
    choice(name: 'RUN_MODE', choices: ['all', 'single', 'parallel'], description: 'Режим запуска тестов')
    choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'], description: 'Браузер для режима single')
  }

  stages {
    stage('Checkout and install') {
      steps {
        checkout scm
        dir('cinema') {
          sh 'node --version'
          sh 'npm --version'
          sh 'npm install'
        }
      }
    }

    stage('Run tests') {
      steps {
        script {
          if (params.RUN_MODE == 'parallel') {
            dir('cinema') {
              sh 'npm run cy:parallel'
            }
          } else if (params.RUN_MODE == 'single') {
            dir('cinema') {
              sh "npm run cy:run:${params.BROWSER}"
            }
          } else {
            dir('cinema') {
              sh 'npm run cy:run:all'
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