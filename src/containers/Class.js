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
import Paper from 'material-ui/Paper'
import ReviewDisplay from '../components/UI/ReviewDisplay'


const playerShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  picture: PropTypes.string,
  name: PropTypes.string,
  review: PropTypes.arrayOf(PropTypes.string),
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
    const {name,picture,lastReview,_id} = student

    return(
      <div className='student' key={_id} >
        <Paper>
          <img src={picture} alt='face' className='profilePic'/>
          <h4>{name}</h4>
          <p className={lastReview}>{lastReview}</p>
        </Paper>
      </div>
    )
  }
  deleteClick(groupId,event){
    console.log(groupId)
    this.props.deleteClass(groupId)
    this.props.push('/')
  }
  convertReviews(group){
    return group.students.map(a => a.lastReview)
  }
  render() {
    const { group } = this.props
    console.log(group)

    if (!group) return null

    const title = group.name

    return (
      <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className="Game">
        <h1>Overview for class {title}</h1>
        <ReviewDisplay reviews={this.convertReviews(group)} />
        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
          {group.students.map(this.renderStudents)}
        </div>
        <AddStudent groupId={group._id} />
        <RaisedButton
          label="Delete Class"
          primary={true}
          onClick={this.deleteClick.bind(this,group._id)}
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
