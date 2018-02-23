// src/routes.js
import React, { Component } from 'react'
import { Route} from 'react-router-dom'

import {
  Lobby,
  Class,
  SignIn,
  Student,
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Lobby} />
        <Route exact path='/class/:classId' component={Class} />
        <Route path='/class/:classId/students/:studentId' component={Student} />
        <Route path='/sign-in' component={SignIn} />
      </div>
    )
  }
}
