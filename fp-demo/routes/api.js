/**
 * Created by snooze on 13/05/17.
 */

var express = require('express');
var router = express.Router();

var Fingerprint = require('../schemas/fingerprint');

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client( {
    // host: 'elasticsearch:9200',
    // For debugging purposes
    host: process.env.DATABASE || 'elasticsearch:9200',
    // log: 'trace'
});
var index = 'fp_data';

function setup(i){
    client.indices.create({
        index: index
    }, function(err, resp, status){
        if (err){
            client.indices.exists({index: index}, function(err, resp, status){
                if (!err && resp) {
                    console.log('[debug] Index already exists');
                } else {
                    //TODO: Trapallada #4 - If first time fails try again!
                    if (!i || i < 10){
                        console.log('[error] Can\'t create index');
                        setup(1)
                    } else {
                        throw new Error('Cannot create index')
                    }
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
    var fingerprint = new Fingerprint(JSON.parse(req.body.fingerprint));
    console.log('-- Pushing data: '+fingerprint.result);
    // console.log(util.inspect(JSON.parse(req.body.fingerprint),{depth: null}));
    // console.log('   Parsed: ');
    console.log(fingerprint.toObject());

    if (!Object.keys(fingerprint.toObject()).length){
        console.log('   Empty');
        // Empty
        return res.status(400).json({status: 'invalid format'})
    } else {
        console.log('   Trying to insert');

        //TODO: Trapallada N#1, el hash necesitava ser un long no?
        var id = 0;
        for (var c in fingerprint.result){
            // console.log(fingerprint.result[c] + ' -> ' + fingerprint.result[c].charCodeAt(0));
            id += fingerprint.result[c].charCodeAt(0);
        }

        client.index({
            index: index,
            type: index,
            body: fingerprint.toObject(),
            id: id
        }, function(err, resp, status){
            if (err) {
                console.log(err);
                return next(err);
            } else {
                console.log('   All green');
                return res.json({status: 'object inserted', data: fingerprint, resp: resp})
            }
        });
    }
});

module.exports = router;