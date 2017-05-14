/**
 * Created by snooze on 13/05/17.
 */

var SchemaObject = require('node-schema-object');

var NotEmptyString = {type: String, minLength: 1};

var Dummy = new SchemaObject({
    firstName: NotEmptyString,
    lastName: NotEmptyString,
    birthDate: Date,
    bool: Boolean
});

module.exports = Dummy;