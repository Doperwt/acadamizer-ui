// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Lobby,
  Game,
  SignIn,
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Lobby} />
        <Route path="/play/:gameId" component={Game} />
        <Route path="/sign-in" component={SignIn} />
      </div>
    )
  }
}