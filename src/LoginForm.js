import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import axios from 'axios'

function validate (email, password) {
  // true means invalid
  return {
    email: email.length === 0,
    password: password.length < 8
  }
}

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.canBeSubmitted()) {
      event.preventDefault()
      return
    }
    const { email, password } = this.state
    const user = {
      email,
      password
    }
    axios.post('/token', user)
      .then(response => {
        if (response.status === 200) {
          browserHistory.push('/profile')
          this.props.updateLoggedIn(true)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  canBeSubmitted () {
    const errors = validate(this.state.email, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  render () {
    const errors = validate(this.state.email, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return (
      <div id='login-overlay' className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title' id='myModalLabel'>Login to <b>Eat Genius</b></h4> or go back to our
            <Link to='/'> main site</Link>.
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-xs-6'>
                <div className='well'>
                  <form onSubmit={this.handleSubmit} id='loginForm'>
                    <div className='form-group'>
                      <label htmlFor='email' className='control-label'>Email</label>
                      <input className={errors.email ? 'error form-control' : 'form-control'} type='text' placeholder='Enter email' value={this.state.email} onChange={this.handleChange} name='email' />
                      <span className='help-block' />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password' className='control-label'>Password</label>
                      <input className={errors.password ? 'error form-control' : 'form-control'} type='password' placeholder='Enter password' value={this.state.password} onChange={this.handleChange} name='password' />

                      <span className='help-block' />
                    </div>
                    <div id='loginErrorMsg' className='alert alert-error hide'>Wrong username or password</div>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' name='remember' id='remember' /> Remember login
                                        </label>
                      <p className='help-block'>(if this is a private computer)</p>
                    </div>

                    <button disabled={isDisabled} type='submit' value='login' name='submit' className='btn btn-success btn-block'>Login</button>

                  </form>
                </div>
              </div>
              <div className='col-xs-6'>
                <p className='lead'>Register now for <span className='text-success'>FREE</span></p>
                <ul className='list-unstyled' style={{lineHeight: '2'}}>
                  <li><span className='fa fa-check text-success' /> Create your profile</li>
                  <li><span className='fa fa-check text-success' /> Create groups with friends</li>
                  <li><span className='fa fa-check text-success' /> Save your favorites</li>
                  <li><span className='fa fa-check text-success' /> Search for restaurants</li>
                  <li><span className='fa fa-check text-success' /> Dining discounts <small>(restrictions apply)</small></li>
                  <li><span className='fa fa-check text-success' /> Never wonder where to eat again!</li>
                </ul>
                <p>
                  <Link to='signup' className='btn btn-info btn-block'>Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default LoginForm
