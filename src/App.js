import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './App.css'
import NavigationBar from './NavigationBar'

import Landing from './Landing'
import Profile from './Profile'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import ModalComponent from './Modal'

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={NavigationBar}>
          <IndexRoute component={Landing} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/profile' component={Profile} />
          <Route path='/Modal' component={ModalComponent} />
        </Route>
      </Router>
    )
  }
}

export default App
