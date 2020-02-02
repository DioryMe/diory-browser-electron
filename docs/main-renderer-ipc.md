# Main-renderer IPC interface

## Format

```
{
  id: "/",
  diograph: {
    "/": {
      id: '/',
      text: 'Me',
      image: 'Me/2017/02 Sveitsi/',
      links: [Object]
    },
    "123-234-546fgfdg": { ... },
    ...
}
```

## Features

1. Loading diograph data...
  1. On startup
  1. When home folder path is changed
  1. When home folder contents is changed
1. Validating diograph data
