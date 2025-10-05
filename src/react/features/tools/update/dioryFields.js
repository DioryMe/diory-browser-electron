export default [
  {
    key: 'key',
    label: 'Address',
    format: 'dialog',
  },
  {
    key: 'text', // copy from children
    label: 'Text',
    format: 'string',
    autoFocus: true,
  },
  {
    key: 'image', // TODO copy from children
    label: 'Image',
    format: 'string',
  },
  {
    key: 'latlng', // TODO copy from children
    label: 'LatLng',
    format: 'latlng',
  },
  {
    key: 'date', // TODO copy from children
    label: 'Date',
    format: 'date',
  },
  {
    key: 'created',
    label: 'Created',
    format: 'date',
  },
  {
    key: 'modified',
    label: 'Modified',
    format: 'date',
  },
  {
    key: 'data',
    label: 'Data',
    format: 'object',
  },
]
