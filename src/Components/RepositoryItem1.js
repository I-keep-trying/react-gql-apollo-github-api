import React from 'react'
import Link from '../Components/Link'
import Button from '../Components/Button'
import { STAR_REPOSITORY } from '../Queries/StarRepository'
import { Mutation } from 'react-apollo'
import '../style.css'

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>
      <div className="RepositoryItem-title-action">
        <Mutation mutation={STAR_REPOSITORY} variables={{ id }}>
          {addStar => (
            <Button className={'RepositoryItem-title-action'} onClick={addStar}>
              {stargazers.totalCount} Star
            </Button>
          )}
        </Mutation>
      </div>
    </div>
    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
)
export default RepositoryItem
