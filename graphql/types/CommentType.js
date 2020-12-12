const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const models = require('../../models');

const commentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        userId: { type: GraphQLInt },
        articleId: { type: GraphQLInt },
        body: { type: GraphQLString},
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
});

module.exports = commentType;