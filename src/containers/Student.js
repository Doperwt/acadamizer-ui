import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Avatar from 'material-ui/Avatar'
import NegativeIcon from 'material-ui/svg-icons/action/thumb-down'
import PositiveIcon from 'material-ui/svg-icons/action/thumb-up'
import NeutralIcon from 'material-ui/svg-icons/action/thumbs-up-down'
import { fetchOneClass } from '../actions/classes/fetch'
import {  push } from 'react-router-redux'

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

  componentWillMount() {
    console.log(this.props.match)
    const {  fetchStudents, subscribeToWebsocket } = this.props
    const { classId,studentId } = this.props.match.params
    fetchOneClass(classId)
    console.log(this.props)
    const student = this.props.student
    subscribeToWebsocket()
  }
  componentWillReceiveProps(nextProps) {
    const { student } = nextProps

    // if (student && !student.name) {
    //   this.props.fetchStudents(group)
    //
    // }
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
    console.log(this.props)
    const student = this.props.student
    return(
      <div>
      <h1>{student.name}</h1>
      <img src={student.picture} className='questionPic' />
      {this.showButtons()}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  console.log(this)
  const group = classes.filter((g) => (g._id === match.params.classId))[0]
  console.log(group)
  const student = group.students.filter(s => s._id === match.params.studentId)[0]
  return {
    group,
    student,
  }
}

export default connect(mapStateToProps,{subscribeToWebsocket,fetchOneClass,push})(Student)
