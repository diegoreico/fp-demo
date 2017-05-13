/**
 * Created by snooze on 13/05/17.
 */

var SchemaObject = require('node-schema-object');

var NotEmptyString = {type: String, minLength: 1};

// TODO: Change to the real data schema
var Data = new SchemaObject({
    firstName: NotEmptyString,
    lastName: NotEmptyString,
    birthDate: Date,
    bool: Boolean
});

module.exports = Data;