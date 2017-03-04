import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import './App.css'
import Navbar from './Navbar'
import Landing from './Landing'
import SignUpForm from './SignUpForm'

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Navbar}>
          <IndexRoute component={Landing} />
          <Route path='signup' component={SignUpForm} />
        </Route>
      </Router>
    )
  }
}

export default App
