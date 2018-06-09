/* Setting things up */
require('dotenv').load({ silent: true }); //Please take .ev.sample as reference

var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);

/* Static things */
var contentRoot = './content/'; // The folder where contents were stored in Markdown format

var renderedContents = {}; // An array to store rendered content "keyed" by a normalized file name.

/* Utilities */

function normalizeFileName(file) {

    var retVal = file;

    retVal = retVal.replace('.md', '');

    return retVal;

}

// Serving things
function serve(file, response) {

    if (chacheHit(file) !== NULL) {

        // We have a cache hit so we serve the rendered content

    } else {

        // We render the content then we serve and cache it

    }

}

// Checking for cached contents
function chacheHit(file) {

    return renderedContents[normalizeFileName(file)] || null;

}

// Sending 404s and love
function send404(file, response) {

    console.log('We have a 404 for: %s', file);
    response.status(400).send('Oh no!');

}

/* Defining Express routes */

app.get('/', (request, response) => response.send('Hello World!'));

// Serving static pages
app.get('/:slug', function(request, response) {

    if (isNaN(request.params.slug)) {

        var fileToBeServed = contentRoot + request.params.slug;
        serve(fileToBeServed, response);

    } else {

        // Huston, we have a 404
        send404(contentRoot + request.params.slug, response);

    }

});

function init() {

    console.log('Hello there!');

}

init();

var port = Number(process.env.PORT || 3000);
server.listen(port, () => console.log('Watchtower is ready and listening on port %s!', server.address().port));