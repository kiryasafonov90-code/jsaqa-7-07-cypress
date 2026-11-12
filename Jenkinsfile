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
          script {
            if (isUnix()) {
              sh 'node --version'
              sh 'npm --version'
              sh 'npm install'
            } else {
              bat 'node --version'
              bat 'npm --version'
              bat 'npm install'
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
                ? "npm run cy:run:${params.BROWSER}"
                : 'npm run cy:run:all')

            if (isUnix()) {
              sh command
            } else {
              bat command
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
