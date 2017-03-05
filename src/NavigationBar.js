import React, { Component } from 'react'
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'

class NavigationBar extends Component {
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
          console.log(res.data)
          browserHistory.push('/profile')
          return
        }

        return
      })
    axios.get('/users/id')
      .then((res) => {
        const name = `${res.data.first_name} ${res.data.last_name}`
        const profileUrl = res.data.profile_photo_url
        const email = res.data.email
        const joinedOn = res.data.created_at.slice(0, 10)
        const userId = res.data.id
        this.setState({ name, profileUrl, joinedOn, email, userId })
      })
      .catch(error => {
        console.error(error)
      })
  }

  updateLoggedIn (newLoggedIn, firstame) {
    console.log('updated')
    this.setState({
      isLoggedIn: newLoggedIn,
      name: this.state.first_name
    })
  }

  updateUser (newUserId) {
    this.setState({
      userId: newUserId
    })
  }

  handleSignout () {
    axios.delete('token')
    this.setState({
      isLoggedIn: false,
      name: ''
    })
    console.log('token deleted')
  }

  render () {
    return (
      <div>
        <Navbar fixedTop inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Super Fork</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {
                this.state.isLoggedIn
                ? <NavDropdown eventKey={3} title='Menu' id='basic-nav-dropdown'>
                  <LinkContainer to={{ pathname: '/profile' }}><MenuItem eventKey={3.1}>Profile</MenuItem></LinkContainer>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
                : null
              }
            </Nav>
            <Nav pullRight>
              {
                this.state.isLoggedIn
                ? <LinkContainer to={{ pathname: '/' }}><NavItem onClick={this.handleSignout}>Sign Out</NavItem></LinkContainer>
                : <LinkContainer to={{ pathname: '/signup' }}><NavItem>Sign Up / Log In</NavItem>
                </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {React.cloneElement(this.props.children, { userId: this.state.userId, updateUser: this.updateUser, isLoggedIn: this.state.isLoggedIn, updateLoggedIn: this.updateLoggedIn })}
      </div>
    )
  }
}

export default NavigationBar
