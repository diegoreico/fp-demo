# What's this?

This is a server-client app that has the following components:

- __Front end website:__ Gets all information about the user as possible without any dialog, makes a fingerprint and send that information to the backend
- __Backend:__
  - __Nodejs:__ Ensures that the format is correct and stores the data into an elasticsearch database
  - __Elasticsearch:__ Is our database choice
  - __Kibana:__ Provides a front-end to see statistics and queries.

All these components run in it's docker container and we need a nginx proxy because kibana don't support authentication and we don't want to expose the statistics dashboard to the mases.

# Installation

```bash
  docker-compose up -d
```

# Testing everything is ok:

## Testing elasticsearch

```bash
curl localhost:9200/_cat/indices?v
curl localhost:9200/test_data
```

# About

## The Schema

The schema of the database is defined in NodeJS using [node-schema-object](https://www.npmjs.com/package/node-schema-object) that lets us ensure that users cannot insert random objects to the database

## The insertion

We'll use the [node elasticsearch connector](https://www.npmjs.com/package/elasticsearch) to help us insert the data into the database.
