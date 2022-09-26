import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query Characters($name: String, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`;

export const GET_SINGLE_CHARACTER = gql`
  query Characters($id: ID!) {
    character(id: $id) {
      id
      name
      type
      status
      species
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        episode
      }
    }
  }
`;
