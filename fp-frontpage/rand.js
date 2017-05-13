var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client( {
    host: 'localhost:9200',
    // For debugging purposes
    // log: 'trace'
});

client.cluster.health({},function(err,resp,status) {
    console.log("-- Client Health --",resp);
});