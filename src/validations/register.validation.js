const ajvInstance = require('../services/ajv-instance');

const registerSchema = {
    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        phone: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
    },
    required: ['first_name', 'last_name', 'phone', 'email', 'password'],
    additionalProperties: true
}

module.exports = ajvInstance.compile(registerSchema);