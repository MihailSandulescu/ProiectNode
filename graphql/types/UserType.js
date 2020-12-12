const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const models = require('../../models');

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        email: { type: GraphQLString },
        username: { type: GraphQLString},
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
});

module.exports = userType;