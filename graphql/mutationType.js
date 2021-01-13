const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const models = require('../models');
const userType = require('./types/UserType');
const articleType = require('./types/ArticleType')
const appConfig = require('../config/appConfig')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: userType,
            args: {
                email: { type: GraphQLString },
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },

            resolve: async (_, { email, username, password }, context) => {
                const created = await models.User.create({ email: email, username: username, password: await bcrypt.hash(password, appConfig.SALT_ROUNDS) });
                return created;
            },
        },

        login: {
            type: GraphQLString,
            args: {
                email: {
                    type: GraphQLNonNull(GraphQLString),
                },
                password: {
                    type: GraphQLNonNull(GraphQLString),
                },
            },
            resolve: async (parent, { email, password }) => {
                const user = await models.User.findOne({
                    where: {
                        email,
                    }
                });

                if (user) {
                    const isValid = await bcrypt.compare(password, user.password);
                    if (isValid) {
                        // Pasam `userId` in token pentru a-l folosi la validarea tokenului (authenticationMiddleware)
                        const token = jwt.sign({ userId: user.id }, appConfig.JWTSECRET);
                        return token;
                    }
                }

                return null;
            },
        },

        createArticle: {
            type: articleType,
            args: {
                title: {
                    type: GraphQLNonNull(GraphQLString),
                },
                body: {
                    type: GraphQLNonNull(GraphQLString),
                }
            },
            resolve: async (parent, { title, body }, context) => {

                // `user` vine din `authenticationMiddleware`
                const { user } = context;
                // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
                if (!user) {
                    return null;
                }

                const created = await models.Article.create({ userId: user.id, title: title, body: body });
                return created;
            },
        }
    },
}
);

module.exports = mutationType;