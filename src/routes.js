// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

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
        <Route exact path="/" component={Lobby} />
        <Route exact path="/goto/:classId" component={Class} />
        <Route path="/sign-in" component={SignIn} />
        <Route exact path="/goto/:classId/student/:studentId" component={Student} />
      </div>
    )
  }
}
