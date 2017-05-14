/**
 * Created by snooze on 13/05/17.
 */

var SchemaObject = require('node-schema-object');

var NotEmptyString = {type: String, minLength: 1};

var Component = new SchemaObject({
   key: NotEmptyString,
   value: 'any'
});

// TODO: Change to the real data schema
var Fingerprint = new SchemaObject({
    components: [Component],
    result: NotEmptyString
});

module.exports = Fingerprint;