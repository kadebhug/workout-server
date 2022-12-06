const ajvInstance = require('../services/ajv-instance');

const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
    additionalProperties: false
}

module.exports = ajvInstance.compile(loginSchema);