const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajvInstance = new Ajv({ allErrors: true });
require("ajv-errors")(ajvInstance /*, {singleError: true} */)
addFormats(ajvInstance);

module.exports = ajvInstance;