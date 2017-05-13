/**
 * Created by snooze on 13/05/17.
 */

var express = require('express');
var router = express.Router();
var Data = require('../schemas/data');
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client( {
    host: 'localhost:9200',
    // For debugging purposes
    // log: 'trace'
});
var index = 'fp_data';

function setup(){
    client.indices.create({
        index: index
    }, function(err, resp, status){
        if (err){
            client.indices.exists({index: index}, function(err, resp, status){
                if (!err && resp) {
                    console.log('[debug] Index already exists');
                } else {
                    throw new Error('Cannot create index')
                }
                })
        } else {
            console.log('[debug] Index created')
        }
    })
}

setup();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('I don\'t think that you understands how this works');
});

router.post('/push', function (req, res, next) {
    var data = new Data(req.body);

    if (!Object.keys(data.toObject()).length){
        // Empty
        return res.json({status: 'invalid format'})
    } else {
        client.index({
            index: index,
            type: index,
            body: data.toObject()
        }, function(err, resp, status){
            if (err) return next(err);
            return res.json({status: 'object inserted', data: data, resp: resp})
        });
    }
});

router.get('/info', function(req,res,next){
    client.cluster.health({},function(err,resp,status) {
        res.json({info: resp})
    });
});

module.exports = router;