import React, { useState } from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import { withState } from 'recompose'
import GET_ISSUES_OF_REPOSITORY from '../Queries/GetIssues'
import IssueItem from './IssueItem'
import Loading from '../utilities/Loading'
import ErrorMessage from '../utilities/Error'
import FetchMore from '../utilities/FetchMore'
import { ButtonUnobtrusive } from '../Components/Button'

const ISSUE_STATES = {
  NONE: 'NONE',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: 'Show Open Issues',
  [ISSUE_STATES.OPEN]: 'Show Closed Issues',
  [ISSUE_STATES.CLOSED]: 'Hide Issues',
};

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const isShow = issueState => issueState !== ISSUE_STATES.NONE;


const Issues = (props) => {
  const [issueState, setIssueState] = useState({ issueState: ISSUE_STATES.OPEN })


  const onChangeIssueState = () => {
    if (issueState !== ISSUE_STATES.NONE && issueState === ISSUE_STATES.CLOSED) {
      setIssueState({ issueState: ISSUE_STATES.OPEN });
    }
    else {
      setIssueState({ issueState: ISSUE_STATES.CLOSED })
    }
   return issueState 
   
  };

  const { repositoryOwner, repositoryName } = props

  const {currentState} = issueState

  return (
    <div className="Issues">
      {console.log(issueState)}
      {console.log(TRANSITION_LABELS[currentState])}
      <ButtonUnobtrusive
          onClick={() =>
            //onChangeIssueState((nextIssueState) => setIssueState(TRANSITION_STATE[nextIssueState]))
            onChangeIssueState()
          }
        >
          {TRANSITION_LABELS[issueState]}
        </ButtonUnobtrusive>
      {isShow(currentState) && (
        <Query
        query={GET_ISSUES_OF_REPOSITORY}
        variables={{
          repositoryOwner,
          repositoryName,
        }}
      >
        {({ data, loading, error }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }
          if (loading && !data) {
            return <Loading />;
          }

          const filteredRepository = {
            issues: {
              edges: data.repository.issues.edges.filter(
                issue => issue.node.state === issueState,
              ),
            },
          };


          if (!filteredRepository.issues.edges.length) {
            return <div className="IssueList">No issues ...</div>;
          }
          return <IssueList issues={data.repository.issues} />;
        }}
      </Query>
      )}
    </div>
  )
  
}


const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
)

export default Issues
