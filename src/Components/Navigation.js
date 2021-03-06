import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as routes from '../constants/routes'
import Button from '../Components/Button'
import Input from '../utilities/Input'
import '../style.css'

const Navigation = ({
  location: { pathname },
  organizationName,
  onOrganizationSearch,
}) => {
  const tabs = document.querySelectorAll(".my-tabs .tabs li");
const sections = document.querySelectorAll(".my-tabs .tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();
    removeActiveTab();
    addActiveTab(tab);
  });
})

const removeActiveTab = () => {
  tabs.forEach(tab => {
    tab.classList.remove("is-active");
  });
  sections.forEach(section => {
    section.classList.remove("is-active");
  });
}

const addActiveTab = tab => {
  tab.classList.add("is-active");
  const href = tab.querySelector("a").getAttribute("href");
  const matchingSection = document.querySelector(href);
  matchingSection.classList.add("is-active");
}

return (
 
  <header className="tab-nav-container">
     {console.log(pathname)}
    <div className="tab teal">
      <Link to="/profile">Profile</Link>
    </div>
    <div className="tab active purple">
      <Link to="/">Organization</Link>
    </div>

    {pathname === "/" && (
      <OrganizationSearch
        organizationName={organizationName}
        onOrganizationSearch={onOrganizationSearch}
      />
    )}
  </header>
)
}



class OrganizationSearch extends React.Component {
  state = {
    value: this.props.organizationName,
  }
  onChange = event => {
    this.setState({ value: event.target.value })
  }
  onSubmit = event => {
    this.props.onOrganizationSearch(this.state.value)
    event.preventDefault()
  }
  render() {
    const { value } = this.state
    return (
      <div className="Navigation-search">
        <form onSubmit={this.onSubmit}>
          <Input
            color={'black'}
            type="text"
            value={value}
            onChange={this.onChange}
          />{' '}
          <Button color={'black'} type="submit">
            Search
          </Button>
        </form>
      </div>
    )
  }
}

export default withRouter(Navigation)
