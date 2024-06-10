require('dotenv').config();
const express = require("express");
const http = require("http");
const path = require('path');
const session = require('express-session');
const passport = require('passport');

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

// Configure session middleware
app.use(session({
    secret: "8016976125",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Include routes middleware
app.use(routes);

// Handle 404 errors
app.route('*').get((req, res) => res.render('Error'));

// Server Listen
connection.then(db => {
    if (!db) return process.exit(1);

    const PORT = process.env.PORT || 3000;

    // Create HTTP server
    http.createServer(app).listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });

    app.on('error', err => console.log(`Failed To Connect with HTTP Server: ${err}`));

}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});
