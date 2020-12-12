const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
// const roleType = require('./userProfileType');
const models = require('../../models');

const userType = new GraphQLObjectType({
    name: 'User',
    // Pentru a evita un crash din cauza dependintei circulare
    // intre userType si userType. Declaram proprietatea `fields`
    // sub forma de functie care returneaza obiect.
    fields: () => ({
        id: { type: GraphQLInt },
        username: {type: GraphQLString },
        email: { type: GraphQLString },
        roles: {
            type: new GraphQLList(userType),
            resolve: async () => {
                return await models.User.findByPk(id, {
                    include: [
                        {
                            model: Tutorial,
                            as: "tutorials",
                            attributes: ...
                        },
                    ],
                });
            }
        },
        password: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    })
});

module.exports = userType;