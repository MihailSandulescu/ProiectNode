const express = require('express');
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql');

const app = express();
const port = 3000;


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(port, function() {
    console.log('server started');
});
