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
        sh 'echo "hola"'
        sh '''ssh mysalsa@52.232.80.32 "docker pull diegoreico/fp-demo"
ssh mysalsa@52.232.80.32 "sudo rm -r docker-compose.yml fp-elasticsearch/config fp-nginx fp-kibana"


scp ./docker-compose.yml mysalsa@52.232.80.32:/home/mysalsa/docker-compose.yml
scp -r ./fp-nginx mysalsa@52.232.80.32:/home/mysalsa/fp-nginx
scp -r ./fp-kibana mysalsa@52.232.80.32:/home/mysalsa/fp-kibana
scp -r ./fp-elasticsearch mysalsa@52.232.80.32:/home/mysalsa/'''
        sh 'ssh mysalsa@52.232.80.32 "docker-compose up -d --force-recreate"'
      }
    }
  }
}