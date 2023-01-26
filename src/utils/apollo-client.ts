import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const SPACE = process.env.CONTENTFUL_SPACE_ID;
const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}`;

const http = new HttpLink({
  uri: URL,
  headers: {
    Authorization: `Bearer ${"ryjW0QNUvk_TJx5tgKZ2bHrWdf-R2On3zAJTgzwSapo"}`,
  },
});

const link: any = ApolloLink.from([http]);

const cache = new InMemoryCache({
  typePolicies: {
    blogsCollection: {
      merge(existing, incoming) {
        return incoming.product;
      },
    },
  },
});

const apolloClient = new ApolloClient({
  link,
  cache,
});

export default apolloClient;
