import React, { Component } from 'react'
import Profile from './Components/Profile'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Organization from './Components/Organization'
import * as routes from './constants/routes'
import Navigation from './Components/Navigation1'
import Footer from './Components/Footer'
import './style.css'

class App extends Component {
  state = {
    organizationName: 'the-road-to-learn-react',
  }

  onOrganizationSearch = value => {
    this.setState({ organizationName: value })
  }

  render() {
    
    const { organizationName } = this.state
    return (
      <Router>
        <div className="App">
          <Navigation
            organizationName={organizationName}
            onOrganizationSearch={this.onOrganizationSearch}
          />
          <div className="App-main">
            <Route
              exact
              path={routes.ORGANIZATION}
              component={<Organization organizationName={organizationName} />}
              component={() => (
                <div className="App-content_large-header">
                  <Organization organizationName={organizationName} />
                </div>
              )}
            />
            <Route
              exact
              path={routes.PROFILE}
              component={() => (
                <div className="App-content_small-header">
                  <Profile />
                </div>
              )}
            />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
