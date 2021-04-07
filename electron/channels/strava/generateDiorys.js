const { extractLocation } = require('./extractLocation')

const {
  formatExerciseType,
  formatText,
  formatEndTime,
  formatDate,
  formatHeartrate,
  formatDuration,
  formatDistance,
} = require('./formats')

const stravaAttributes = {
  id: 'Activity ID',
  date: 'Activity Date',
  name: 'Activity Name',
  type: 'Activity Type',
  distance: 'Distance',
  movingTime: 'Moving Time',
  heartrate: 'Average Heart Rate',
  elapsedTime: 'Elapsed Time',
  gpsFile: 'Filename',
}

function convertToInternalAttributes(activity) {
  return Object.entries(stravaAttributes).reduce(
    (obj, [newKey, oldKey]) => ({
      ...obj,
      [newKey]: activity[oldKey],
    }),
    {}
  )
}

async function extractLocationFromGpsFile({ gpsFile, ...activity }) {
  const location = await extractLocation(gpsFile)
  return {
    ...activity,
    ...location,
  }
}

function mapActivityToDiory({
  id,
  date,
  name,
  type,
  latitude,
  longitude,
  distance,
  movingTime,
  heartrate,
  elapsedTime,
}) {
  return {
    id: `strava_${id}`,
    date: formatDate(date),
    text: formatText(name, type),
    latitude,
    longitude,
    data: [
      {
        '@context': 'https://schema.org',
        '@type': 'ExerciseAction',
        exerciseType: formatExerciseType(type),
        distance: formatDistance(distance),
        duration: formatDuration(movingTime),
        startTime: formatDate(date),
        endTime: formatEndTime(date, elapsedTime),
        ...formatHeartrate(heartrate),
      },
    ],
  }
}

exports.generateDiorys = async function generateDiorys(activities) {
  const activitiesWithLocation = await Promise.all(
    activities.map(convertToInternalAttributes).map(extractLocationFromGpsFile)
  )

  return activitiesWithLocation.map(mapActivityToDiory)
}
