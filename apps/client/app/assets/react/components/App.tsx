import React from "react";
import {BrowserRouter, Route} from "react-router";
import {List} from "./train/List";
import {TrainRepositoryInterface} from "../../../../src/domain/train/TrainRepositoryInterface";

interface Dependencies {
    TrainRepository: TrainRepositoryInterface;
}

export const App = ({TrainRepository}: Dependencies) => {
    return (
        <BrowserRouter>
            <Route path="/">
                <List trainRepository={TrainRepository}/>
            </Route>
        </BrowserRouter>
    )
}
