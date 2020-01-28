const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");

app.use(express.static(path.join(publicDirectoryPath)));
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "🛰️ Weather App",
    footer: "Made with ❤️"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide your address."
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(data.latitude, data.longitude, (error, forecastdata) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast: forecastdata,
        location: data.location,
        address: req.query.address
      });
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About this app",
    text: "This is about text",
    footer: "Made with ❤️"
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "Page are not found!",
    text: "Page are not found!",
    footer: "Made with LOVE"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page are not found! 404",
    text: "Page are not found! 404",
    footer: "Made with LOVE"
  });
});

app.listen(port, () => {
  console.log("Port is up on port " + port);
});
