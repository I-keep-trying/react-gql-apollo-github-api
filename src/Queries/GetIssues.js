import gql from 'graphql-tag'

const GET_ISSUES_OF_REPOSITORY = gql`
  query(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueState: IssueState!
    $cursor: String
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(
        first: 10
        states: [$issueState]
        after: $cursor
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
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
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

export default GET_ISSUES_OF_REPOSITORY
