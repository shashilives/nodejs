const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


//handlebar portials dir, commonly used code snippet can be put in here 
//A partials is a partials piece of a  website
hbs.registerPartials(__dirname + '/views/partials');

//Telling express what view engine to use
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    // a custom handler to perform some activity
    var now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next(); // this is req to notify that other function can be called
});

// only this page will be renderd, nothing else will happen as next() is not called
app.use((req, res, next) => {
    res.render('maintenance');
});
//Middle ware    to serve public folder
// app.use( '/static',express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

//Helper function
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send(
    //     {
    //         name: 'Chandru',
    //         age: 28
    //     }
    // );'
    res.render('home.hbs', {
        title: "Home Page",
        welcomeMsg: "Albert Einstein"
    });
});


// we can pass paramet to the handle bar ie the second parameter in app.render will be an object with parameters
app.get('/about', (req, res) => {
    //res.send("<h1>This is about page</h1>")
    res.render('about.hbs', {
        title: 'About Page updated'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle message"
    });
});

app.get('/maintenance', (req, res) => {
    res.render('maintenance');
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});