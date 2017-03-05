import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Form, Button } from 'react-bootstrap'

class NewForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render () {
    return (
      <Form inline>
        <FormGroup controlId='formInlineName'>
          <ControlLabel>Name</ControlLabel>
          {' '}
          <FormControl type='text' placeholder='Jane Doe' />
        </FormGroup>
        {' '}
        <FormGroup controlId='formInlineEmail'>
          <ControlLabel>Email</ControlLabel>
          {' '}
          <FormControl type='email' placeholder='jane.doe@example.com' />
        </FormGroup>
        {' '}
        <Button type='submit'>
        Send invitation
      </Button>
      </Form>
    )
  }
}

export default NewForm
