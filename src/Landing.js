import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

class Landing extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Jumbotron>
        <h1>Hello, from Super Fork!</h1>
        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p><Button style={{ marginLeft: '1%' }} bsStyle='primary'>Learn more</Button></p>
      </Jumbotron>
    )
  }
}

export default Landing
