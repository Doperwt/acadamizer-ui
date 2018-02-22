// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchClasses, { fetchStudents } from '../actions/classes/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateClassButton from '../components/classes/CreateClassButton'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye'
// import JoinGameIcon from 'material-ui/svg-icons/social/person-add'
// import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
// import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchClasses()
    this.props.subscribeToWebsocket()
  }

  goToClass = classId => event => this.props.push(`/goto/${classId}`)


  renderClass = (group, index) => {
    let ActionIcon =  WatchGameIcon
    // if (!group.students[0].name) { this.props.fetchStudents(group) }

    const title = group.name

    return (
      <MenuItem
        key={index}
        onClick={this.goToClass(group._id)}
        rightIcon={<ActionIcon />}
        primaryText={title} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Classes overview</h1>
        <CreateClassButton />
        <Paper className="paper">
          <Menu>
            {this.props.classes.map(this.renderClass)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ classes, currentUser }) => ({ classes, currentUser })

export default connect(mapStateToProps, { fetchClasses, subscribeToWebsocket, fetchStudents, push })(Lobby)
