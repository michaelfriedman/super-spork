import axios from 'axios'
import React from 'react'
import { Link, browserHistory } from 'react-router'

class Navbar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      userId: 0
    }
    this.updateUser = this.updateUser.bind(this)
    this.handleSignout = this.handleSignout.bind(this)
    this.updateLoggedIn = this.updateLoggedIn.bind(this)
  }

  componentDidMount () {
    axios.get('/token')
      .then((res) => {
        if (res.data) {
          this.setState({
            isLoggedIn: true
          })
          browserHistory.push('/profile')
          return
        }

        return
      })
  }

  updateLoggedIn (newLoggedIn) {
    this.setState({
      isLoggedIn: newLoggedIn
    })
  }

  updateUser (newUserId) {
    this.setState({
      userId: newUserId
    })
    this.forceUpdate()
  }

  handleSignout () {
    axios.delete('token')
    // location.reload()
    this.setState({
      isLoggedIn: false
    })
    console.log('token deleted')
  }
  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
              <Link className='navbar-brand' to='/'>Super Spork</Link>
            </div>

            <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
              <ul className='nav navbar-nav' />
              <ul className='nav navbar-nav navbar-right'>
                { this.state.isLoggedIn
                  ? <li className='active'>
                    <Link to='/' onClick={this.handleSignout}>Sign Out</Link>
                  </li>
                : <li>
                  <Link to='signup'>Sign Up / Log In</Link>
                </li>
                }
              </ul>
            </div>
          </div>
        </nav>
        {React.cloneElement(this.props.children, { userId: this.state.userId, updateUser: this.updateUser, isLoggedIn: this.state.isLoggedIn, updateLoggedIn: this.updateLoggedIn })}
      </div>
    )
  }
}

module.exports = Navbar
