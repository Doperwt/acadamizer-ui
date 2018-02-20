// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createGame from '../../actions/classes/create'

class CreateGameButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }
  clickButton(name,start,end){
    console.log(name,start,end)
    // this.props.createGame(name,start,end)
  }
  render() {
    if (!this.props.signedIn) return null
    console.log(this.props)
    return (
      <div className="CreateGameButton"><form onSubmit={this.props.clickButton} >
      <input type='field' placeholder='name' />
      <input type='date' value={Date.now.strf} />
      <input type='date' value={Date.now.strf} />

        <RaisedButton
          style={{ background:'blue',color:'yellow'}}
          label="Create Class"
          primary={true}
          // onClick=
          icon={<StarIcon />} /></form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createGame })(CreateGameButton)
