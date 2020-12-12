const { GraphQLObjectType, GraphQLNonNull, GraphQLInt } = require('graphql');
const models = require('../models');
const articleType = require('./types/ArticleType');
const userType = require('./types/UserType');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getUser: {
            type: userType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, {id}) => {
                const usr = await models.User.findByPk(id);
                if (!usr) {
                    throw new Error('no user exists with id ' + id);
                }
                return usr;
            },
        },
        getArticle: {
            type: articleType,
            args: {
                articleId: {
                    type: GraphQLInt
                }
            },
            resolve: async (_, {articleId}) => {
                const article = await models.Article.findByPk(articleId, {
                    include: [
                        {
                            model: models.Comment,
                            //as: "comments"
                        },
                    ],
                })
                return {id: article.id, body: article.body, comments: await article.getComments()};
            }
        },
    }
});

module.exports = queryType;