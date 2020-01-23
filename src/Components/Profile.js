import React from 'react'
import { Query } from 'react-apollo'
import {GET_REPOSITORIES_OF_CURRENT_USER} from '../Queries/GetRepositories'
import RepositoryList from './RepositoryList'
import Loading from '../utilities/Loading'
import ErrorMessage from '../utilities/Error'

const Profile = () => (
  <Query
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      // const { viewer } = data;
      if (error) {
        return <ErrorMessage error={error} />
      }
      if (!data) {
        return <Loading />
      }

      return (
        <RepositoryList
          loading={loading}
          repositories={data.viewer.repositories}
          fetchMore={fetchMore}
          entry={'viewer'}
        />
      )
    }}
  </Query>
)

export default Profile
