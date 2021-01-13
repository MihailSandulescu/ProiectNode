const { GraphQLObjectType, GraphQLNonNull, GraphQLInt } = require('graphql');
const models = require('../models');
const articleType = require('./types/ArticleType');
const userType = require('./types/UserType');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, {id}, context) => {

                // `user` vine din `authenticationMiddleware`
                const { user } = context;
                // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
                if(!user) {
                    return null;
                }

                const usr = await models.User.findByPk(id);
                if (!usr) {
                    throw new Error('no user exists with id ' + id);
                }
                return usr;
            },
        },
        article: {
            type: articleType,
            args: {
                articleId: {
                    type: GraphQLInt
                }
            },
            resolve: async (_, {articleId}) => {
                // `user` vine din `authenticationMiddleware`
                const { user } = context;
                // Daca nu exista `user` pe context inseamna ca userul nu este autentificat.
                if (!user) {
                    return null;
                }


                return await models.Article.findByPk(articleId);
            }
        },
    }
});

module.exports = queryType;