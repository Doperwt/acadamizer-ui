// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createClass from '../../actions/classes/create'

class CreateClassButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {start: ''};
    this.state = {end: ''};
    this.state = {start: ''};
  }

  clickButton(){
    console.log(this.state)
    let name = this.state.name
    let start = this.state.start
    let end = this.state.end
    this.props.createClass(name,start,end)
  }

  handleChangeName(event){
    this.setState({name: event.target.value})
    console.log(event.target.value)
  }

  handleChangeStart(event){
    this.setState({start: event.target.value})
    console.log(this.state.start)
  }

  handleChangeEnd(event){
    this.setState({end: event.target.value})
    console.log(this.state.end)
  }

  render() {
    if (!this.props.signedIn) return null
    return (
      <div className="CreateGameButton"><form>
      <p>Batch number:</p><input type='number' placeholder='number' value={this.props.name} onChange={this.handleChangeName.bind(this)} />
      <p>start date:</p><input type='date' value={this.props.start} onChange={this.handleChangeStart.bind(this)}/>
      <p>end date:</p><input type='date' value={this.props.end} onChange={this.handleChangeEnd.bind(this)}/>

        <RaisedButton
          style={{ background:'blue',color:'yellow'}}
          label="Create Class"
          primary={true}
          onClick={this.clickButton.bind(this)}
          icon={<StarIcon />} /></form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createClass })(CreateClassButton)
