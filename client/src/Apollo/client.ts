import { ApolloClient, DocumentNode, InMemoryCache } from '@apollo/client';

type Query = <QV, RT>(name: string, query: DocumentNode, variables?: QV) => Promise<RT>;
type Mutate = <MV, RT>(name: string, mutation: DocumentNode, variables?: MV) => Promise<RT>;

export type GraphQLClient = {
  query: Query;
  mutate: Mutate;
};

export const createGQLClient = (): GraphQLClient => {
  const cache = new InMemoryCache({
    addTypename: false,
    resultCaching: false
  });

  const client = new ApolloClient({
    // Provide required constructor fields
    cache,
    uri:
      process.env.NODE_ENV === 'production'
        ? `${process.env.REACT_APP_BACKEND_URL}/graphql`
        : `${process.env.REACT_APP_BACKEND_LOCAL_URL}/graphql`,

    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      mutate: {
        fetchPolicy: 'no-cache'
      }
    }
  });

  const query: Query = (name, query, variables) => {
    return client
      .query({
        query,
        variables,
        fetchPolicy: 'no-cache'
      })
      .then(({ data }) => data[name]);
  };

  const mutate: Mutate = (name, mutation, variables) => {
    return client
      .mutate({
        mutation,
        variables
      })
      .then(({ data }) => data[name]);
  };

  return { query, mutate };
};
