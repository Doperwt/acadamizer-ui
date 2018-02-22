// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import AddIcon from 'material-ui/svg-icons/social/person-add'
import submitStudent from '../../actions/classes/submitStudent'
import Paper from 'material-ui/Paper'

class addStudent extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = {name: ''};
    this.state = {picture: ''};
  }
  clickButton(){
    console.log(this.state)
    let groupId = this.props.groupId
    let name = this.state.name
    let picture = this.state.picture
    this.props.submitStudent(groupId,name,picture)
  }
  handleChangeName(event){
    this.setState({name: event.target.value})
  }
  handleChangePicture(event){
    this.setState({picture: event.target.value})
  }

  render() {
    if (!this.props.signedIn) return null
    return (
      <div className="addStudent"><Paper>
      <input type='field' placeholder='name' value={this.props.name} onChange={this.handleChangeName.bind(this)} /><br/>
      <input type='field' placeholder='add picture' value={this.props.picture} onChange={this.handleChangePicture.bind(this)}/><br/>
        <RaisedButton
          label="Add student"
          primary={true}
          onClick={this.clickButton.bind(this)}
          icon={<AddIcon />} /></Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { submitStudent })(addStudent)
