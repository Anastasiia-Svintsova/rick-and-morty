import { gql } from '@apollo/client'

export const GET_CHARACTERS = gql`
  query Characters($name: String, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
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
`
