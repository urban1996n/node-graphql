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
import {container} from "tsyringe";
import {
    TrainQueryResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainQueryResolver";
import {Kernel} from "apps/server/src/modules/trains/infrastructure/kernel/Kernel";
import * as TrainServices from "apps/server/src/modules/trains/application/services";
import * as SharedServices from "apps/server/src/modules/shared/application/services";
import {
    TrainMutationResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainMutationResolver";

import * as ResolverServices from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/services";

const kernel = new Kernel();

kernel.addLoader(TrainServices);
kernel.addLoader(SharedServices);
kernel.addLoader(ResolverServices);
kernel.setup(container);

await kernel.register();
await kernel.boot();

const trainQueryResolver = container.resolve<TrainQueryResolver>(TrainQueryResolver);
const trainMutationResolver = container.resolve<TrainMutationResolver>(TrainMutationResolver);

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
    Query: {
        trains: () => trainQueryResolver.getTrains(),
        train: (parent, args) => trainQueryResolver.getTrain(args.id)
    },
    Mutation: {
        createTrain: (parent, args) => trainMutationResolver.createTrain(args.name)
    }
};

const schemaLocation = join('docs', 'schema.graphql');

const typeDefs = readFileSync(schemaLocation, 'utf8');
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer<{ }>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});

await server.start();

app.use(
    cors(),
    express.json(),
    expressMiddleware(server, undefined),
);

httpServer.listen(4000);
console.log(`🚀 Server ready at http://localhost:4000`);
