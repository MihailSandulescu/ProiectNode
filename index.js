const express = require('express');
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
// const schema = require('./graphql');

const app = express();
const port = 3000;
//
//
// app.use('/graphql', graphqlHTTP({
//     schema,
// }));
//
// app.listen(port, function() {
//     console.log('server started');
// });

const { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input UserInput {
    email: String
    username: String
  }
  
  type User {
    id: ID!
    email: String
    username: String
  }
  
  type Comment {
    userId: Int!
    articleId: Int!
    body: String
  }
  
  type Article {
    userId: Int!
    title: String
    body: String
    comments: [Comment]
  }
  
  type Query {
    getUser(id: ID!): User
    getArticle(articleId: ID!): Article
  }
  
  type Mutation {
    createUser(email: String!, username: String!): User
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    getUser: async ({id}) => {
        const usr = await models.User.findByPk(id);
        if(!usr) {
            throw new Error('no user exists with id ' + id);
        }
        return usr;
    },
    getArticle: async ({articleId}) => {
        const article = await models.Article.findByPk(articleId, {
            include: [
                {
                    model: models.Comment,
                    //as: "comments"
                },
            ],
        })
        return {id: article.id, body: article.body, comments: await article.getComments()};
    },

    createUser: async ({email, username}) => {
        const created = await models.User.create({email: email, username: username});
        return created;
    }
};

// Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ getUser(id: 121) {id, username} }', root).then((response) => {
//     console.log(response);
// });
//
// graphql(schema, '{ getArticle(articleId: 304) {title, body, comments {body}} }', root).then((response) => {
//     console.log(response);
// });

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(3000);
console.log('Running a GraphQL API server at localhost:3000/graphql');