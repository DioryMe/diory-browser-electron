export const roomFields = [
  {
    key: 'id',
    label: 'Room id',
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
        key: 'id',
        label: 'Connection id',
        format: 'string',
        disabled: true,
      },
      {
        key: 'client',
        label: 'Client',
        format: 'string',
      },
      {
        key: 'address',
        label: 'Address',
        format: 'string',
      },
    ],
  },
]
