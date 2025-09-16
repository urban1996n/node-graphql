import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import { readFileSync } from 'fs';
import {join} from 'path';
import {Resolvers} from "apps/server/src/__generated__/graphql";
import "reflect-metadata";
import {setupServices} from "apps/server/config/services";
import {container} from "tsyringe";
import {
    GetTrainsResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/GetTrainsResolver";

setupServices({container})
    .then(() => {console.log('Services set up')})
    .catch((err) => {console.error('Error setting up services', err)});

const trainsResolver = container.resolve<GetTrainsResolver>(GetTrainsResolver);

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
    Query: {
        trains: () => trainsResolver.getTrains(),
        train: (parent, args) => {
            const id = args.id;
            return trainsResolver.getTrains().then(trains => trains.find(train => train.id === id) || null);
        }
    },
};

const schemaLocation = join('docs', 'schema.graphql');

const typeDefs = readFileSync(schemaLocation, 'utf8');
const app = express();
const httpServer = http.createServer(app);

const log = () => {
    console.log('log');
}

const logger = {
    debug: log,
    info: log,
    warn: log,
    error: log,
}

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    logger,
});

await server.start();

app.use(
    cors(),
    express.json(),
    expressMiddleware(server),
);

httpServer.listen(4000);
console.log(`🚀 Server ready at http://localhost:4000`);
