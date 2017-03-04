import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'torqfs7z'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dk5dqve4y/upload'

function validate (first_name, last_name, email, password, password_confirm) {
  // true means invalid
  return {
    first_name: first_name.length === 0,
    last_name: last_name.length === 0,
    email: email.length === 0,
    password: password.length < 8,
    password_confirm: password !== password_confirm
  }
}

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
      uploadedFileCloudinaryUrl: '',
      everFocusedFirstName: false,
      everFocusedEmail: false,
      everFocusedPassword: false,
      everFocusedPasswordConfirm: false,
      inFocus: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.canBeSubmitted = this.canBeSubmitted.bind(this)
    this.onImageDrop = this.onImageDrop.bind(this)
  }

  handleChange ({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value
      })
    }
  }

  onImageDrop (files) {
    this.setState({
      uploadedFile: files[0]
    })
    this.handleImageUpload(files[0])
  }
  handleImageUpload (file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        })
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.canBeSubmitted()) {
      event.preventDefault()
      return
    }

    const { first_name, last_name, email, password, uploadedFileCloudinaryUrl } = this.state
    const user = {
      first_name,
      last_name,
      email,
      password,
      profile_photo_url: uploadedFileCloudinaryUrl
    }

    axios.post('/users', user)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          // browserHistory.push('/profile')
          console.log('status 200')
          // location.reload()
          this.props.updateLoggedIn(true)
        }
      })
        .catch(error => {
          console.log(error)
        })
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: ''
    })
  }

  canBeSubmitted () {
    const errors = validate(this.state.first_name, this.state.last_name, this.state.email, this.state.password, this.state.password_confirm)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  render () {
    const errors = validate(this.state.first_name, this.state.last_name, this.state.email, this.state.password, this.state.password_confirm)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return (
      <div className='container'>
        <div className='row centered-form'>
          <div className='col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Please sign up for Eat Genius <small>It's free!</small></h3>
              </div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit} role='form'>
                  <div className='row'>
                    <div className='col-xs-6 col-sm-6 col-md-6'>
                      <div className='form-group'>
                        <input className={errors.first_name ? 'error form-control input-sm' : 'form-control input-sm'} type='text' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange} name='first_name' />
                      </div>
                    </div>
                    <div className='col-xs-6 col-sm-6 col-md-6'>
                      <div className='form-group'>
                        <input className={errors.last_name ? 'error form-control input-sm' : 'form-control input-sm'} type='text' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange} name='last_name' />
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <input className={errors.email ? 'error form-control input-sm' : 'form-control input-sm'} type='text' placeholder='Enter email' value={this.state.email} onChange={this.handleChange} name='email' />
                  </div>
                  <div className='row'>
                    <div className='col-xs-6 col-sm-6 col-md-6'>
                      <div className='form-group'>
                        <input className={errors.password ? 'error form-control input-sm' : 'form-control input-sm'} type='password' placeholder='Enter password' value={this.state.password} onChange={this.handleChange} name='password' />

                      </div>
                    </div>
                    <div className='col-xs-6 col-sm-6 col-md-6'>
                      <div className='form-group'>
                        <input className={errors.password_confirm ? 'error form-control input-sm' : 'form-control input-sm'} type='password' placeholder='Confirm Password' value={this.state.password_confirm} onChange={this.handleChange} name='password_confirm' />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <div>
                      <Dropzone multiple={false}
                        accept='image/jpg,image/jpeg,image/png' onDrop={this.onImageDrop.bind(this)}>
                        <p>Drop a profile photo or click to select a photo to upload.</p>
                      </Dropzone>
                      <div>
                        <div className='FileUpload'>
                          ...
                        </div>
                        <div>
                          { this.state.uploadedFileCloudinaryUrl === ''
                          ? null
                          : <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <img className='img-thumbnail' style={{marginBottom: '2%'}} src={this.state.uploadedFileCloudinaryUrl}
                              role='presentation'
                          />
                          </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <input disabled={isDisabled} type='submit' value='Register' className='btn btn-info btn-block' />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpForm
