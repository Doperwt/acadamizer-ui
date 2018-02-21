// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import NegativeIcon from 'material-ui/svg-icons/action/thumb-down'
import PositiveIcon from 'material-ui/svg-icons/action/thumb-up'
import NeutralIcon from 'material-ui/svg-icons/action/thumbs-up-down'
import QuestionIcon from 'material-ui/svg-icons/action/assignment-ind'
import Paper from 'material-ui/Paper'
import './askQuestion.css'


class AskQuestion extends PureComponent {
  static propTypes = {

  }
  constructor(props) {
    super(props);
    this.state = {selectedStudent: ''};

  }

  whatType(){
    let random = Math.floor(Math.random() *100)+1
    console.log(random)
    if(random < 49 ){ return 'negative'}
    if(random >= 49 && random <= 82){ return 'neutral'}
    return 'positive'
  }

  randomStudent(length){
    return Math.floor(Math.random() *length)
  }

  clickButton(students,event){
    let type = this.whatType()
    let selectedStudents = students.filter(s => s.lastReview === type)
    let student =  selectedStudents[this.randomStudent(selectedStudents.length)]
    this.setState({selectedStudent: student})
  }

  render() {
    const students = this.props.students
    return (
      <div className="AskQuestion">
        <RaisedButton
          label="Ask a Question"
          primary={true}
          onClick={this.clickButton.bind(this,students)}
          icon={<QuestionIcon />} />
          <Paper>
          <img src={this.state.selectedStudent.picture} className='questionPic'/>
          <p className={this.state.selectedStudent.lastReview}> {this.state.selectedStudent.name}</p>
          </Paper>
      </div>
    )
  }
}


export default connect(null, {  })(AskQuestion)
