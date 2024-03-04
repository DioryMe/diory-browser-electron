export const roomFields = [
  {
    key: 'id',
    label: 'Id',
    format: 'string',
    disabled: true,
  },
  {
    key: 'text',
    label: 'Text',
    format: 'string',
    autoFocus: true,
  },
  {
    key: 'connections',
    label: 'Connections',
    format: 'array',
    fields: [
      {
        key: 'connector',
        label: 'Connector',
        format: 'string',
      },
      {
        key: 'address',
        label: 'Address',
        format: 'string',
      },
    ],
  },
  {
    key: 'doors',
    label: 'Doors',
    format: 'array',
    fields: [
      {
        key: 'id',
        label: 'Room id',
        format: 'string',
      },
    ],
  },
]
