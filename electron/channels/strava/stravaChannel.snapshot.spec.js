const { stravaChannel } = require('./stravaChannel')

describe('stravaChannel', () => {
  it('generates diorys from strava activity.csv and activity gps files', async () => {
    const { diorys } = await stravaChannel('some-event', {
      filePath: __dirname + '/example/activities.csv',
    })

    expect(diorys).toMatchSnapshot()
  })
})
