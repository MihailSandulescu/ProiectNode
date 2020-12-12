const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const models = require('../../models');
const commentType = require('./CommentType');

const articleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        userId: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString},
        comments: { type: new GraphQLList(commentType)},
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
});

module.exports = articleType;