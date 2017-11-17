"use strict";

// Basic express setup:

const PORT            = 8080;
const express         = require("express");
const bodyParser      = require("body-parser");
const app             = express();
const MongoClient     = require("mongodb").MongoClient;
const MONGODB_URI     = "mongodb://localhost:27017/tweeter";
const sassMiddleware  = require("node-sass-middleware");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// should compile sass when page loads
app.use(sassMiddleware({
  src: "./public/",
  debug: true,
  outputStyle: 'expanded'
}));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  // db.collection('tweets').find().toArray((err, tweets) => {
  //   console.log(tweets);
  // });

  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);


  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  });

});