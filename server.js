const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

// fetch to the json-server API
const fetch = require('node-fetch');

const app = express();


// ### Handlebars setup ###
app.engine('hbs', hbs({

    // extension of file
    extname: 'hbs',

    // default layout folder name
    defaultLayout: 'layout',

    layoutsDir: __dirname + '/views/layouts',

    partialsDir: __dirname + '/views/patials'
}));

// setup the view engine
app.set('view engine', 'hbs');


// ### Middleware CSS ###

// fetch the static file css
// when you get a request for css, go to /public/css and render the file
app.use("/css", express.static(__dirname + '/public/css'));

const jsonParser = bodyParser.json();


// ### REQUESTS ###

// GET
app.get('/', (req, res) => {

    // by default is going to be GET request to the json server
    fetch('http://localhost:3004/messages')

        // it returns a Prominise so we catch it in then
        .then(response => {

            // json() returns a Promise, so we need to do then(callbackWhenThePromiseIsResolved)
            // json = all the message objects in db.json
            response.json().then(json => {
                res.render('home', {
                    articles: json
                })
            })
        })
        // when the Promise is rejected
        .catch(error => {
            console.log(error);
        })
});

app.get('/add_note', (req, res) => {
    res.render('add_note');
});

app.get('/edit_note/:id', (req, res) => {

    console.log(req.params.id);

    fetch(`http://localhost:3004/messages/${req.params.id}`)
        .then(response => {

            // get the json = a single object from message
            response.json().then(json => {

                console.log(json);

                // pass the data about that note
                res.render('edit_note', {
                    articles: json
                })
            })
        })
        // when the Promise is rejected
        .catch(error => {
            console.log(error);
        })
});

// fake REST API
// typicode/json-server
// - open a new connection on a new port and listen to req on that port
// - grab the data and store it somewhere

// PORT var exist on the deployed server, or 3000 locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});

// POST

// will receive some json data
// jsonParser - middleware, convert everything to json and store it in the req
app.post('/api/add_note', jsonParser, (req, res) => {
    // console.log(req.body);

    // because we don't have our own API, we need to do a fetch-ES6
    // with this, we can do async operations: send data to an API, network requests
    // we are going to make a request to  http://localhost:3004/messages
    // because this request is returning a Promise, we need to catch the "then"

    // post the data entered in the app's add_note form into the messages array in db.json
    // and then send a 200 status code back to the app
    // 1st param = make a request to this url at the json server
    // 2nd param = the request to this url
    fetch('http://localhost:3004/messages', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // after we get a response = json server is inserting the req data in db.json as an object,
        // we are sending a reponse to the actual webpage of our app
        res.status(200).send()
    
    }).catch(error => {
        console.log(error);
    })
});

// PATCH

// we are passing some JSON, we need the jsonParser middleware
app.patch('/api/edit_note/:id', jsonParser, (req, res) => {

    fetch(`http://localhost:3004/messages/${req.params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        res.status(200).send();
    })
     // when the Promise is rejected
     .catch(error => {
        console.log(error);
    })
})

// DELETE

app.delete('/api/delete/:id', (req, res) => {

    const id = req.params.id;

    // a request for delte to the json server
    // if we make a request for a particuat message, we need to pass the "location"
    // of that message 'http://localhost:3004/messages/3
    fetch(`http://localhost:3004/messages/${id}`, {
        method: 'DELETE',
    })
    // when the Promise is resolved
    // inside the fat arrow function we get a response, so we put response in the param
    // the response will be cought in the home.hbs success() or error() methods
    .then(response => {
        res.status(200).send();
    })
     // when the Promise is rejected
     .catch(error => {
        console.log(error);
    })
});

