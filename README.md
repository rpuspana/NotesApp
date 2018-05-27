### Description

App that helps you take notes/reminders. Your notes/reminders are stored in the db.json file

### Tech used

- Node.Js 8

- JavaScript ES6

- Express Node.js web server

- json-server - fake REST API that stores data in db.json in JSON format https://github.com/typicode/json-server 

- body-parser (npm module) - parse json from request body

- express-handlebars (npm module) - dynamic HTML templating engine

	*.hbs - handlebars HTML templates

- node-fetch (npm module) - A light-weight module that brings window.fetch to Node.js

### Install dependencies and start app

Execute these commands from the project's root folder:
- install project dependency json-server:  npm install json-server --save . More info https://github.com/typicode/json-server
- install project dependencies: npm install
- give this command in terminal 1 : nodemon server.js
- give this command in terminal 2 : json-server --watch db.json --port 3004