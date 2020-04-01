// Require the framework and instantiate it
const fastify = require('./server.js');

// Import external dependancies
const gql = require('fastify-gql');

// Import GraphQL Schema
const schema = require('./schema');

// Register Fastify GraphQL
fastify.register(gql, {
    schema,
    graphiql: true
});


// Import Routes
const routes = require('./routes');

// Import Swagger Options
const swagger = require('./config/swagger');

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

routes.forEach((route, index) => {
    console.log("\nRoute: "+JSON.stringify(route));
    fastify.route(route)
});


// Run the server!
const start = async () => {
    try {
        await fastify.listen(3010,'0.0.0.0');
        fastify.swagger();
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1)
    }
};
start();
