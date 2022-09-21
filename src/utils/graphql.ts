import {
  ApolloClient,
  InMemoryCache,
  DocumentNode,
  OperationVariables,
} from '@apollo/client';

export const request = async (
  query: DocumentNode,
  variables?: OperationVariables
) => {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  const response = await client.query({ query, variables });
  const { data } = response;

  return data;
};
