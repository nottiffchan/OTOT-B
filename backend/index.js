let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
const serverless = require("serverless-http");

// Initialise the app
let app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

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

// const databaseUri = process.env.DB_URL_PROD;
const databaseUri =
  "mongodb+srv://tiff:tiff123@cs3219-otot-b.mgt6yzc.mongodb.net/test";

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

module.exports.handler = serverless(app);
