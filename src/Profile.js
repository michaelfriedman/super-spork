import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      profileUrl: '',
      joinedOn: '',
      email: '',
      userId: ''
    }
  }

  componentDidMount () {
    axios.get('/users/id')
      .then((res) => {
        const name = `${res.data.first_name} ${res.data.last_name}`
        const profileUrl = res.data.profile_photo_url
        const email = res.data.email
        const joinedOn = res.data.created_at.slice(0, 10)
        const userId = res.data.id
        this.setState({ name, profileUrl, joinedOn, email, userId })
        console.log(this.state)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render () {
    return (
      <div>
        Profile
      </div>
    )
  }
}

module.exports = Profile
