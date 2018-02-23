// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import QuestionIcon from 'material-ui/svg-icons/action/assignment-ind'
import Paper from 'material-ui/Paper'
import './askQuestion.css'


class AskQuestion extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {selectedStudent: ''};
  }

  whatType(){
    let random = Math.floor(Math.random() *100)+1
    if(random < 49 ){ return 'negative'}
    if(random >= 49 && random <= 82){ return 'neutral'}
    return 'positive'
  }

  randomStudent(length){
    return Math.floor(Math.random() *length)
  }

  clickButton(students,event){
    let i = 0
    let selectedStudents
    while(i ===0){
      let type = this.whatType()
      selectedStudents = students.filter(s => s.lastReview === type)
      i=selectedStudents.length
    }
    let student =  selectedStudents[this.randomStudent(selectedStudents.length)]
    this.setState({selectedStudent: student})
  }

  render() {
    const students = this.props.students
    return (
      <div className='AskQuestion'>
        <Paper>
          <RaisedButton
            label='Ask a Question'
            primary={true}
            onClick={this.clickButton.bind(this,students)}
            icon={<QuestionIcon />} />
          <br/>
          <img src={this.state.selectedStudent.picture} className='questionPic' />
          <p className={this.state.selectedStudent.lastReview}> {this.state.selectedStudent.name}</p>
        </Paper>
      </div>
    )
  }
}


export default connect(null, {  })(AskQuestion)
