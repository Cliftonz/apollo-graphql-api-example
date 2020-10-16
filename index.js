const {execute, subscribe} = require("graphql");
const bodyParser = require('body-parser');
const {join } = require('path')
const { ApolloServer, gql,makeExecutableSchema,addSchemaLevelResolveFunction,i } = require('apollo-server');
const resolvers = require('./gql/resolvers')
const express = require("express");
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
module.exports = pubsub;

const schema = loadSchemaSync(join( __dirname, '/gql/schema.graphql'), { loaders: [new GraphQLFileLoader()] });

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

const rootResolveFunction = (parent, args, context, info) => {
    //perform action before any other resolvers
};

addSchemaLevelResolveFunction(schemaWithResolvers, rootResolveFunction)

const apolloServer  = new ApolloServer({
    schema: schemaWithResolvers,
    playground: true,
    context: request => {
        return {
            request,
            pubsub
        }
    } ,
    tracing: true

});

apolloServer.listen().then(
    ({ url,subscriptionsUrl }) => {
        console.log(`🚀 Server ready at ${url}`);
        console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
    }
);

