import React, { Component } from 'react'
import { Query } from 'react-apollo'
import GET_ISSUES_OF_REPOSITORY from '../Queries/GetIssues'
import IssueItem from './IssueItem'
import Loading from '../utilities/Loading'
import ErrorMessage from '../utilities/Error'
import { ButtonUnobtrusive } from './Button'

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

 class Issues extends React.Component {
  state = {
    issueState: ISSUE_STATES.NONE,
  };

  onChangeIssueState = nextIssueState => {
    this.setState({ issueState: nextIssueState });
  };

  render() {
    const { issueState } = this.state;
    const { repositoryOwner, repositoryName } = this.props;
console.log(this.props)
{console.log(this.state)}
    return (
      <div className="Issues">
        <ButtonUnobtrusive
            onClick={() =>
              this.onChangeIssueState(TRANSITION_STATE[issueState])
            }
          >
            {TRANSITION_LABELS[issueState]}
          </ButtonUnobtrusive>
        {isShow(issueState) && (
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
            return <IssueList issues={filteredRepository.issues} />;
          }}
        </Query>
        )}
      </div>
    )
  
  }
  
}


const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
)

export default Issues
