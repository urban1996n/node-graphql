import {TrainRepositoryInterface} from "src/domain/train/TrainRepositoryInterface";
import {ApolloClient, gql, TypedDocumentNode} from "@apollo/client";
import {Train} from "src/domain/train/Train";
import {Query} from "../../../../server/src/__generated__/graphql";

export class ApolloGraphQLTrainRepository implements TrainRepositoryInterface
{
    constructor(private readonly apolloClient: ApolloClient) {
    }

    async findOne(id: string): Promise<Train | undefined> {
        const getOneQuery: TypedDocumentNode<Query> = gql`
            query GetTrainsQuery($id: ID!) {
                train(id: $id) {
                    id,
                    name
                }
            }
        `;

        const result =  await this.apolloClient.query<Train>(
            {query: getOneQuery, variables: {id}}
        );

        return result.data;
    }

    async findAll(): Promise<Train[]> {
        const getAllQuery: TypedDocumentNode<Query> = gql`
            query GetAllTrains {
                trains {
                    id,
                    name
                }
            }
        `

        const result = await this.apolloClient.query<Train[]>({query: getAllQuery});

        return result.data ?? [];
    }
}
