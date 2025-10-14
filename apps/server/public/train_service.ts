import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@as-integrations/express5';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import express, {Express} from 'express';
import http from 'http';
import cors from 'cors';
import {readFileSync} from 'fs';
import {join} from 'path';
import {Resolvers} from "apps/server/src/__generated__/graphql";
import "reflect-metadata";
import {container} from "tsyringe";
import {
    TrainQueryResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainQueryResolver";
import * as TrainServices from "apps/server/src/modules/trains/application/services";
import * as SharedServices from "apps/server/src/modules/shared/application/services";
import {
    TrainMutationResolver
} from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/Train/TrainMutationResolver";

import * as ResolverServices from "apps/server/src/modules/trains/infrastructure/presentation/resolvers/services";
import {Environment, ExpressServer, Kernel} from "@node-graphql/shared/server";

const kernel = new Kernel();
kernel.addLoader(TrainServices);
kernel.addLoader(SharedServices);
kernel.addLoader(ResolverServices);
kernel.setup(container);

const graphQl = express();

const loadGraphQL = async (graphQl: Express) => {
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
    const httpServer = http.createServer(graphQl);

    // Set up Apollo Server
    const graphQLServer = new ApolloServer<{ }>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });

    await graphQLServer.start();

    graphQl.use(
        cors(),
        express.json(),
        expressMiddleware(graphQLServer, undefined),
    );
}

const server = new ExpressServer(graphQl, Environment.DEV, 4000);
server.setKernel(kernel);
await server.start(() => loadGraphQL(graphQl))
