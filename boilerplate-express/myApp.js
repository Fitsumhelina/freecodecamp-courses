const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');

// Load environment variables from a .env file if it exists
dotenv.config();


// Middleware to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

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


// Middleware to add current time to the request object
const addTimeMiddleware =(req,res,next) => {
    req.time = new Date().toString();
    next();
};

// method 1
// Final handler to respond with the time
const timeHandler =(req,res,) => {
    res.json({time: req.time})
};
app.get('/now', addTimeMiddleware, timeHandler);


// metjod 2
// Route definition for /now with middleware and final handler
app.get("/now",addTimeMiddleware, (req,res) => {
    res.json({time: req.time})
})

//// Echo server route handler
app.get("/:word/echo",(req,res) => {
    const word = req.params.word;
    res.json({echo: word})
})


// Route handler for /name
app.get ("/name", (req,res) => {

    const firstName= req.query.first
    const lastName= req.query.last
    
    res.json({ name:`${firstName} ${lastName}` });

})


//  Get Data from POST Requests
app.post ("/name", (req,res) => {

    const firstName= req.body.first
    const lastName= req.body.last
    
    res.json({ name:`${firstName} ${lastName}` });

})



module.exports = app;
