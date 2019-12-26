import { gql } from 'apollo-server';

export default gql`
  type Event {
    id: ID!
    title: String!
    start: String!
    end: String!
    description: String!
  }

  type Query {
    getEvents: [Event]
  }

  type Mutation {
    addEvent(
      title: String!
      start: String!
      end: String!
      description: String!
    ): Event!
    deleteEvent(id: ID!): [Event]!
  }
`;
