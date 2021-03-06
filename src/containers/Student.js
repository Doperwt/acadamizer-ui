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
import UpdateStudent from '../actions/classes/updateStudent'
import AddReview from '../actions/classes/addReview'
import ReviewDisplay from '../components/UI/ReviewDisplay'
import RaisedButton from 'material-ui/RaisedButton'
import moment from 'moment'
import QuestionIcon from 'material-ui/svg-icons/action/assignment-ind'
import Paper from 'material-ui/Paper'
import './Student.css'

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

  constructor(props) {
    super(props);
    let today = moment().format('YYYY-MM-DD').toString()
    this.state = {reviewType: 'positive',comment:'',date:today};
  }

  componentWillMount() {
    console.log(this.props.match)
    const {  group, fetchOneClass, subscribeToWebsocket } = this.props
    const { classId } = this.props.match.params
    if (!group) { fetchOneClass(classId) }
    console.log(this.props)
    // const student = group.students.filter(s => s._id === studentId)[0]
    subscribeToWebsocket()
  }

  goToClass = (classId) => event => this.props.push(`/class/${classId}`)

  setReview(type){
    this.setState({reviewType:type})
  }
  setDescription(event){
    this.setState({comment:event.target.value})
  }
  setDate(event){
    this.setState({date:event.target.value})

  }
  buttonColor(color,type){
    if(this.state.reviewType===type){return color}
    return 'grey'
  }
  showButtons(){
    return(
      <div key='buttons'>
        <Avatar icon={<PositiveIcon/>} color={this.buttonColor('green','positive')} onClick={this.setReview.bind(this,'positive')} />
        <Avatar icon={<NeutralIcon/>} color={this.buttonColor('yellow','neutral')} onClick={this.setReview.bind(this,'neutral')} />
        <Avatar icon={<NegativeIcon/>} color={this.buttonColor('red','negative')} onClick={this.setReview.bind(this,'negative')} />
      </div>
    )
  }
  renderReviews(review,index){
    return(
      <div key={review._id}>
        <p>{review.review} review: {review.description} on date {review.date}</p>
      </div>
    )
  }

  addReview(studentId,groupId,route,event){
    const students = this.props.group.students
    let update = {
      description:this.state.comment,
      date:this.state.date,
      review:this.state.reviewType
    }
    let currentIndex =  students.map(s => s._id.toString()).indexOf(studentId.toString())
    let nextId
    console.log(update)
    if((update.review!=='positive') && !(update.description==='')){
      this.props.AddReview(groupId,studentId,update)
      if(currentIndex >= (students.length)-1 ){ route=1}
      else { nextId = students[(currentIndex+1)]._id}
      if(route===1){this.props.push(`/class/${groupId}`)}
      if(route===0){this.props.push(`/class/${groupId}/students/${nextId}`)}
    }
    else if((update.review==='positive')){
      this.props.AddReview(groupId,studentId,update)
      if(currentIndex >= (students.length)-1 ){ route=1}
      else { nextId = students[(currentIndex+1)]._id}
      if(route===1){this.props.push(`/class/${groupId}`)}
      if(route===0){this.props.push(`/class/${groupId}/students/${nextId}`)}
    }
    else { alert('for reviews that arent positive you need to fill in a description')}

  }

  render(){
    const student = this.props.student
    const group = this.props.group
    const reviews = student.reviews.map(r => r.review)

    return(
      <div className='show'>
      <Paper>
        <h1>{student.name}</h1>
        <RaisedButton
          label='Back to class'
          primary={false}
          onClick={this.goToClass(group._id)}
          icon={<QuestionIcon />} />
        <ReviewDisplay reviews={reviews} />
        <img src={student.picture} className='questionPic' alt='face'/>
        {this.showButtons()}
        <form>
        <input type='field' placeholder='comment' value={this.props.comment} onChange={this.setDescription.bind(this)} /><br/>
        <input type='date' value={this.state.date.toString()} onChange={this.setDate.bind(this)}/><br/>
        <RaisedButton
          label='Save & close'
          primary={true}
          onClick={this.addReview.bind(this,student._id,group._id,1)}
          icon={<QuestionIcon />} /><br/>
        <RaisedButton
          label='Save & next'
          primary={false}
          onClick={this.addReview.bind(this,student._id,group._id,0)}
          icon={<QuestionIcon />} />
        </form>
        {student.reviews.map(this.renderReviews)}
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  console.log(this)
  const group = classes.filter((g) => (g._id === match.params.classId))[0]
  const student = group.students.filter(s => s._id === match.params.studentId)[0]
  return {
    group,
    student,
  }
}

export default connect(mapStateToProps,{subscribeToWebsocket,fetchOneClass,push,UpdateStudent,AddReview})(Student)
