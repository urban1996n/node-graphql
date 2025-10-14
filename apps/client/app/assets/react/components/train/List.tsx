import React from 'react';
import {Layout} from "../layout/Layout";
import {TrainRepositoryInterface} from "../../../../../src/domain/train/TrainRepositoryInterface";

interface IProps {
    trainRepository: TrainRepositoryInterface;
}

export const List = ({trainRepository}: IProps) => {
    return <Layout>
        <div className="p-6">
            <h1 className="text-2xl font-bold">Train List</h1>
        </div>
    </Layout>
}
