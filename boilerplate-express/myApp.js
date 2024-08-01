const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from a .env file if it exists
dotenv.config();


// Example for serving static assets from the "public" directory
app.use("/public", express.static(__dirname + "/public"));



// Middleware to log the method, path, and IP address
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next(); 
  });

// Example for logging a message
console.log(`Hello Express`);

// Example for sending a simple text response
app.get("/", function(req , res) {
    res.send(`Hello Express`)
});

// Example for serving an HTML file
app.get("/", (req , res) => {
    res.sendFile( __dirname + "/views/index.html" );
});


// Original /json route handler without MESSAGE_STYLE handling
app.get("/json", (req , res) => {
   res.json({"message": "Hello json"})
});

// Updated /json route handler with MESSAGE_STYLE handling
app.get("/json", (req, res) => {
    let msg = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        msg = msg.toUpperCase();
    }
    res.json({ message: msg });
});







module.exports = app;
