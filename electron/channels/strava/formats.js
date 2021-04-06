const {
  cycling,
  running,
  walking,
  skating,
  skiing,
  swimming,
  rowing,
  workout,
} = require('../../diograph.org/exerciseTypes')

const toKms = (meters) => Math.round(parseFloat(meters) / 100) / 10

exports.formatText = (name = '', type) => (name.includes(type) ? name : `${name}, ${type}`)
exports.formatDate = (date) => date && new Date(date).toISOString()
exports.formatHeartrate = (heartrate) => heartrate && { heartrate: Math.round(heartrate) }
exports.formatDistance = (meters) => `${toKms(meters)} km`
exports.formatDuration = (seconds) =>
  seconds && new Date(seconds * 1000).toISOString().substr(11, 8)
exports.formatEndTime = (date, seconds) =>
  date && seconds && new Date(Date.parse(date) + seconds * 1000).toISOString()

exports.formatExerciseType = (type) =>
  ({
    Ride: cycling,
    'Virtual Ride': cycling,
    Run: running,
    Hike: walking,
    Walk: walking,
    'Nordic Ski': skiing,
    'Backcountry Ski': skiing,
    'Inline Skate': skating,
    'Ice Skate': skating,
    Swim: swimming,
    Rowing: rowing,
    Workout: workout,
  }[type] || workout)
