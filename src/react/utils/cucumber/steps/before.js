import { Before } from 'cucumber'

Before('@pending', (scenario, callback) => {
  callback(null, 'pending')
})
