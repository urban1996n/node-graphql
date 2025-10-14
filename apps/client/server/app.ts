import {Environment, ExpressServer} from "@node-graphql/shared/server"
import express from "express"

await (new ExpressServer(express(), Environment.DEV, 4000)).start();
