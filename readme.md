# Installation

```bash
docker pull elasticsearch
docker pull kibana
docker run --name fp_elasticsearch -p 9200:9200 -p 9300:9300 -d -v "$PWD/data":/usr/share/elasticsearch/data elasticsearch
docker run --name fp_kibana -e ELASTICSEARCH_URL=http://localhost:9200 -p 5601:5601 -d kibana
```

## Better using docker-compose

```bash
  docker-compose up -d
  curl localhost:9200/_cat/indices?v
  curl localhost:9200/test_data
```
