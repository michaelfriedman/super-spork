import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import SignUpForm from './SignUpForm'

/*
The app element allows you to specify the portion of your app that should be hidden (via aria-hidden)
to prevent assistive technologies such as screenreaders from reading content outside of the content of
your modal.  It can be specified in the following ways:

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

*/
// var appElement = document.getElementById('your-app-element')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class ModalComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  openModal () {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal () {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00'
  }

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  render () {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >

          <h2 ref='subtitle'>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <SignUpForm />
        </Modal>
      </div>
    )
  }
}

export default ModalComponent
