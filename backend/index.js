let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
const serverless = require("serverless-http");

let app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

let apiRoutes = require("./api-routes");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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

app.get("/", (req, res) => res.send("Hello World with Express"));

app.use("/api", apiRoutes);
app.listen(port, function () {
  console.log("Running Spendy on port " + port);
});

module.exports.handler = serverless(app);
