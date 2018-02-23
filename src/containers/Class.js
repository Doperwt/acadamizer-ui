import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneClass, fetchStudents } from '../actions/classes/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import AddStudent from '../components/classes/addStudent'
import RaisedButton from 'material-ui/RaisedButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'
import deleteClass from '../actions/classes/deleteClass'
import {  push } from 'react-router-redux'
import './Class.css'
import ReviewDisplay from '../components/UI/ReviewDisplay'
import ShowStudent from '../components/classes/showStudent'
import AskQuestion from '../components/classes/AskQuestion'
import moment from 'moment'

const reviewShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  description: PropTypes.string
})

const playerShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  picture: PropTypes.string,
  name: PropTypes.string,
  reviews: PropTypes.arrayOf(reviewShape).isRequired,
})

class Class extends PureComponent {
  static propTypes = {
    fetchOneClass: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    group: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(playerShape).isRequired,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  }


  componentWillMount() {
    const { group, fetchOneClass, subscribeToWebsocket } = this.props
    const { classId } = this.props.match.params
    if (!group) { fetchOneClass(classId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { group } = nextProps

    if (group && !group.students[0].name) {
      this.props.fetchStudents(group)
    }
  }

  renderStudents(student, index){
    return(
        <ShowStudent student={student} groupId={this._id} key={student._id}/>
    )
  }

  deleteClass(groupId,event){
    console.log(this.props)
    this.props.deleteClass(groupId)
    this.props.push('/')
  }
  convertReviews(group){
    return group.students.map(a => a.lastReview)
  }

  render() {
    const { group } = this.props
    console.log(this.props)
    const stuff = group
    if (!group) return null
    const startDate = moment(group.startDate.toString(),'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD-MM-YYYY').toString()
      const endDate = moment(group.endDate.toString(),'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD-MM-YYYY').toString()
    const title = group.name

    return (
      <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className='Game' key={group._id}>
        <h1>Overview for class {title}</h1>
        <h3>Class runs from {startDate} until {endDate}</h3>
        <ReviewDisplay reviews={this.convertReviews(group)} />
        <AskQuestion students={group.students}/>
        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
          {group.students.map(this.renderStudents.bind(stuff))}
        </div>
        <AddStudent groupId={group._id} /><br/>
        <RaisedButton
          label='Delete Class'
          primary={true}
          onClick={this.deleteClass.bind(this,group._id)}
          icon={<DeleteIcon />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  const group = classes.filter((g) => (g._id === match.params.classId))[0]
  return {
    group,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneClass,
  fetchStudents,
  deleteClass,
  push
})(Class)
