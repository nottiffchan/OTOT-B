let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
const dotenv = require("dotenv");
dotenv.config();

const databaseUri = process.env.DB_URL_PROD;

mongoose.connect(databaseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB database successfully!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
  throw new Error("Failed to connect to MongoDB database!");
});

const port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Spendy on port " + port);
});

module.exports = app;
