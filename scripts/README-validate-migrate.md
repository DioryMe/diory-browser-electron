# Validator & migrator

```
# Validate
node scripts/validator.js public/development-content-room

# Migrate
node scripts/migrator.js public/development-content-room
```

## What it validates?

1. Every link points to a diory that is part of the diograph
2. latlng is string with correct structure + no latitude / longitude
3. data is an array
4. links is an object
5. All other fields are string

## What it migrates?

1. latitude & longitude to latlng
2. Adds single color background image if image doesn't exist
3. data attribute from object to an array
