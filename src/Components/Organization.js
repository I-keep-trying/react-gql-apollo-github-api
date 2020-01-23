import React from 'react'
import { Query } from 'react-apollo'
import {GET_REPOSITORIES_OF_ORGANIZATION} from '../Queries/GetRepositories'
import Loading from '../utilities/Loading';
import ErrorMessage from '../utilities/Error';
import RepositoryList from './RepositoryList'

const Organization = ({ organizationName }) => (
<Query
 query={GET_REPOSITORIES_OF_ORGANIZATION}
 variables={{
   organizationName,
 }}
 skip={organizationName === ''}
 notifyOnNetworkStatusChange={true}
>
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
     
      if (loading && !data) {
        return <Loading />;
      }
      return (
        <RepositoryList
          loading={loading}
          repositories={data.organization.repositories}
          fetchMore={fetchMore}
          entry={'organization'}
        />
      );
    }}
  </Query>
)


export default Organization
