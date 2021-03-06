# GraphQL & Node.JS coding exercise

An Apollo GraphQL server developed in Node.js. The project is structured in a scalable manner.

### Tech

This project uses a number of open source libraries:

- [node.js](http://nodejs.org) - evented I/O for the backend
- [apollo-server](https://www.npmjs.com/package/apollo-server) - a community-maintained open-source GraphQL server
- [apollo-server-test](https://www.npmjs.com/package/apollo-server-testing) - tooling to make testing easier to users of all of the apollo-server integrations
- [graphql](https://www.npmjs.com/package/graphql) - a query language for APIs created by Facebook.
- [graphql-tools](https://www.npmjs.com/package/graphql-tools) - a set of utilities for faster development of GraphQL Schemas
- [mongoose](https://www.npmjs.com/package/mongoose) - a set of utilities for generating MongoDB schemas
- [jest]() - a javascript testing library
- [eslint](https://eslint.org) - a static code analyser library - manually configured to work with prettier

### Installation

This project requires [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/1) to be installed.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm start
```

### Usage

To use the server, open the browser and go to http://localhost:3000 for the graphiql interface or send http requests.

To run the implemented integration tests, run:

```sh
npm test
```
