/* Setting things up */
require('dotenv').load({ silent: true }); //Please take .ev.sample as reference

var http = require('http');
var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('combined'));

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

    if (cacheHit(file) !== null) {

        // We have a cache hit so we serve the rendered content


    } else {

        // We render the content then we serve and cache it

    }

}

// Checking for cached contents
function cacheHit(file) {

    return renderedContents[normalizeFileName(file)] || null;

}

// Caching a content
function addContentToCache(file, contentData) {

    console.log('Adding to cache: %s', normalizeFileName(file));
    renderedContents[normalizeFileName(file)] = _.extend({ file: normalizeFileName(file), date: new Date() }, contentData);

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

        console.log('We have a request for the slug: %s', request.params.slug);
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