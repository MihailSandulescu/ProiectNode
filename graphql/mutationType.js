const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const userType = require('./types/UserType')
const config = require('../config/config');

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: userType,
            args: {
                    email: {type: GraphQLString},
                    username: {type: GraphQLString},
                },

            resolve: async (_, {email, username}) => {
                const created = await models.User.create({email: email, username: username});
                return created;
            },
        },

            },
        }
        );

module.exports = mutationType;