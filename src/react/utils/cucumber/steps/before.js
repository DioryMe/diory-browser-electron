import { Before } from 'cucumber'

Before('@pending', function(scenario, callback) {
  callback(null, 'pending')
})
