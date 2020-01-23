import React, { Fragment } from 'react'
import RepositoryItem from './RepositoryItem'
import FetchMore from '../utilities/FetchMore'
import Issues from './IssueList1'
import '../style.css'

/* const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }
  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ],
      },
    },
  }
} 
*/

const getUpdateQuery = entry => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult
  }
  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  }
}

const RepositoryList = ({ repositories, loading, fetchMore, entry }) => (
  <Fragment>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
        <Issues repositoryName={node.name} repositoryOwner={node.owner.login} />
      </div>
    ))}
    <FetchMore
    loading={loading}
      hasNextPage={repositories.pageInfo.hasNextPage}
      variables={{
        cursor: repositories.pageInfo.endCursor,
      }}
      updateQuery={getUpdateQuery(entry)}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </Fragment>
)

export default RepositoryList