// ES6
'use strict'

// vals
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const dotenv = require("dotenv").load();

// app
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
require("./routes/gallery")(app);

// serve out production assets
app.use(express.static("client/build"));

// if it dosent recognize the route
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// start server
server.listen(port, host);
console.log(`Magic is happening on ${port}`);