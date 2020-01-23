import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as routes from '../constants/routes'
import Button from '../Components/Button'
import Input from '../utilities/Input'

const Navigation = () => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.ORGANIZATION}>Organization</Link>
    </div>
  </header>
)

export default Navigation
