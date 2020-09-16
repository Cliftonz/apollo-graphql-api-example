const {join } = require('path')
const { ApolloServer, gql,makeExecutableSchema,addSchemaLevelResolveFunction,i } = require('apollo-server');
const resolvers = require('./gql/resolvers')
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { addResolversToSchema } = require('@graphql-tools/schema');

const schema = loadSchemaSync(join( __dirname, '/gql/schema.graphql'), { loaders: [new GraphQLFileLoader()] });

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

const rootResolveFunction = (parent, args, context, info) => {
    //perform action before any other resolvers
};

addSchemaLevelResolveFunction(schemaWithResolvers, rootResolveFunction)

const server = new ApolloServer({
    schema: schemaWithResolvers,
    playground: true
});

server.listen().then(
    ({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    }
);

