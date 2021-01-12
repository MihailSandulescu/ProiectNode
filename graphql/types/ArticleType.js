const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const models = require('../../models');
const commentType = require('./CommentType');
const userType = require('./UserType');


const articleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        user: { type: userType,
                resolve: async (parent) => {
                    return await parent.getUser();
            }},
        title: { type: GraphQLString },
        body: { type: GraphQLString},
        comments: { type: new GraphQLList(commentType),
            resolve: async (parent) => {
                return await parent.getComments();
            }},
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
});

module.exports = articleType;