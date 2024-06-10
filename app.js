require('dotenv').config();
const express = require("express");
const http = require("http"); // Use the 'http' module instead of 'https'
const path = require('path');

const app = express();

// Set up static directory
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Middleware for parsing JSON and urlencoded bodies
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Database connection
const connection = require('./db.js');

// Routes
const routes = require('./routes/route');
app.use(routes);

// Server Listen
connection.then(db => {
    if (!db) return process.exit(1);

    const PORT = process.env.PORT || 3000;

    // Create HTTP server instead of HTTPS
    http.createServer(app).listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });

    app.on('error', err => console.log(`Failed To Connect with HTTP Server: ${err}`));

    // Error in MongoDB connection
}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});
