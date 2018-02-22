import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'
import RemoveStudent from '../../actions/classes/removeStudent'
import Paper from 'material-ui/Paper'
import {  push } from 'react-router-redux'

class ShowStudent extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  removeStudent(studentId,groupId,event){
    this.props.RemoveStudent(groupId,studentId)
  }

  goToStudent = (classId,_id) => event => this.props.push(`/goto/${classId}/student/${_id}`)

  render(){
    const {name,picture,lastReview,_id} = this.props.student
    const groupId = this.props.groupId
    return(
      <div className='student' key={_id} >
        <Paper>
          <img src={picture} alt='face' className='profilePic' onClick={this.goToStudent(groupId,_id)}/>
          <h4>{name}</h4>
          <p className={lastReview}>{lastReview}</p>
          <RaisedButton
            label="Remove"
            primary={false}
            onClick={this.removeStudent.bind(this,_id,groupId)}
            icon={<DeleteIcon />} />
        </Paper>
      </div>
    )
  }
}

export default connect(null, {RemoveStudent, push})(ShowStudent)
