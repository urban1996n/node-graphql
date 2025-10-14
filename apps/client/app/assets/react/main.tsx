import {createRoot} from "react-dom/client";
import React from 'react'
import {App} from "./components/App";
import {ApolloGraphQLTrainRepository} from "../../../src/domain/train/ApolloGraphQLTrainRepository";
import {ApolloClient} from "@apollo/client";

const client = new ApolloClient();

createRoot(document.getElementById('root')!)
    ?.render(<App TrainRepository={new ApolloGraphQLTrainRepository()}/>)
