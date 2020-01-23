import gql from 'graphql-tag'

const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryOwner: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 10, orderBy:{field: CREATED_AT, direction: DESC } ) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`

export default GET_ISSUES_OF_REPOSITORY
