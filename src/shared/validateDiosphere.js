const Ajv = require('ajv')

const ajv = new Ajv({ allErrors: true })

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['rooms'],
  additionalProperties: false,
  properties: {
    rooms: {
      type: 'object',
      required: ['/'],
      additionalProperties: {
        type: 'object',
        required: ['id', 'created', 'modified'],
        properties: {
          id: { type: 'string' },
          created: { type: 'string' },
          modified: { type: 'string' },
          text: { type: 'string' },
          doors: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id'],
              properties: {
                id: { type: 'string' },
              },
            },
          },
          connections: {
            type: 'array',
            items: {
              type: 'object',
              required: ['address', 'client'],
              properties: {
                id: { type: 'string' },
                address: { type: 'string' },
                client: { type: 'string' },
              },
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    },
  },
}

const validateDiosphere = (diosphereObject) => {
  const validate = ajv.compile(schema)

  const isValid = validate(diosphereObject)

  if (!isValid) {
    console.log(`Diosphere is not valid: ${JSON.stringify(validate.errors)}`)
    throw new Error(`Diosphere is not valid: ${JSON.stringify(validate.errors)}`)
  }
}

module.exports = { validateDiosphere }
