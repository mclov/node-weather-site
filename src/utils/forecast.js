const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/5688f310bb6b92f19199dcbce8a3d0ba/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      const temperature = body.currently.temperature
      const precipProbability = body.currently.precipProbability
      callback(undefined, `${body.daily.data[0].summary} It is currently ${temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is ${precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast