const request = require("request");

const geocode = (address, callback) => {
  const geocodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicGF2ZWxzeXUiLCJhIjoiY2s1b255Y3dwMDh2MjNvbzh5Y3R4ZHFheiJ9.O_Io6CHNGukgWpNCj5jvhQ";

  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("Can't connect with server. Try again later.", undefined);
    } else if (response.body.features.length === 0) {
      callback("Can't find your location. Check your address.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
