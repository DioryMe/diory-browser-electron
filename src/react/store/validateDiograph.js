// TODO: Use from @diograph/diograph

// eslint-disable-next-line import/no-unresolved, no-unused-vars
// import { validateDiograph } from '@diograph/diograph/validator'

const Ajv = require('ajv')

const ajv = new Ajv({ allErrors: true })

const validate = (schema, objectToValidate) => {
  const validate = ajv.compile(schema)

  const isValid = validate(objectToValidate)

  if (!isValid) {
    console.log(`Object is not valid based on schema: ${JSON.stringify(validate.errors)}`)
    throw new Error(`Object is not valid based on schema: ${JSON.stringify(validate.errors)}`)
  }
}

const diorySchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'created', 'modified'],
  properties: {
    id: { type: 'string' },
    text: { type: 'string' },
    date: { type: 'string' /* format: 'date-time' */ },
    latlng: { type: 'string' /* format: 'geolocation' */ },
    image: { type: 'string' },
    modified: { type: 'string' /* format: 'date-time' */ },
    created: { type: 'string' /* format: 'date-time' */ },
    links: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          path: { type: 'string' },
        },
        required: ['id'],
        additionalProperties: false,
      },
    },
    data: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['@context', '@type', 'contentUrl', 'encodingFormat'],
        properties: {
          '@context': { type: 'string' },
          '@type': { type: 'string' },
          contentUrl: { type: 'string' },
          encodingFormat: { type: 'string' },
          height: { type: 'number' },
          width: { type: 'number' },
          duration: { type: 'string' },
        },
      },
    },
  },
}

// eslint-disable-next-line import/no-unresolved, no-unused-vars
const validateDiory = (dioryObject) => {
  validate(diorySchema, dioryObject)
}

const diographSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  additionalProperties: diorySchema,
  required: ['/'],
}

const validateDiograph = (diographObject) => {
  validate(diographSchema, diographObject)
}

module.exports = { validateDiograph }
