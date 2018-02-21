import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Avatar from 'material-ui/Avatar'
import NegativeIcon from 'material-ui/svg-icons/action/thumb-down'
import PositiveIcon from 'material-ui/svg-icons/action/thumb-up'
import NeutralIcon from 'material-ui/svg-icons/action/thumbs-up-down'

const reviewShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  description: PropTypes.string
})

class Student extends PureComponent{
  static propTypes = {
    name: PropTypes.string,
    reviews: PropTypes.arrayOf(reviewShape),
  }
  
  showButtons(){
    return(
      <div key='buttons'>
      <Avatar icon={<PositiveIcon/>} color='green' />
      <Avatar icon={<NeutralIcon/>} color='yellow' />
      <Avatar icon={<NegativeIcon/>} color='red' />
      </div>
    )
  }
  render(){

    return(

    )
  }
}
