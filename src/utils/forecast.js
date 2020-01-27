const request = require("request");

const forecast = (lat, lon, callback) => {
  const forecastUrl =
    "https://api.darksky.net/forecast/d0466ef31da1f60311649ae34d683f3e/" +
    lat +
    "," +
    lon +
    "?units=si";

  request({ url: forecastUrl, json: true }, (error, response) => {
    if (error) {
      callback(
        "Can't connect with weather server. Try again later.",
        undefined
      );
    } else if (response.body.code === 400) {
      callback("Can't get forecast. Poorly formatted request.", undefined);
    } else {
      callback(undefined, {
        forecast:
          response.body.currently.summary +
          " sky. Temperature is " +
          Math.round(response.body.currently.temperature) +
          " C°. Feels like " +
          Math.round(response.body.currently.apparentTemperature) +
          " C°."
      });
    }
  });
};

module.exports = forecast;
