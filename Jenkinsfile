pipeline {
  agent any
  stages {
    stage('build and  push') {
      steps {
        sh '''docker build fp-demo -t diegoreico/fp-demo
docker push diegoreico/fp-demo'''
      }
    }
    stage('run on server') {
      steps {
        sh '''ssh mysalsa@52.232.80.32 "docker pull diegoreico/fp-demo"
scp ./docker-compose.yml mysalsa@52.232.80.32:/home/mysalsa/docker-compose.yml
scp -r ./fp-nginx mysalsa@52.232.80.32:/home/mysalsa/fp-nginx'''
        sh '''ssh mysalsa@52.232.80.32 "docker-compose down"
ssh mysalsa@52.232.80.32 "docker-compose rm"
ssh mysalsa@52.232.80.32 "docker-compose up -d --force-recreate"'''
      }
    }
  }
}