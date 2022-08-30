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

if (process.env.ENV === "dev") {
  mongoose.connect(process.env.DB_URL_DEV, { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.DB_URL_PROD, { useNewUrlParser: true });
}

var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

const port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Spendy on port " + port);
});
