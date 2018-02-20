import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneClass, fetchStudents } from '../actions/classes/fetch'
import doTurn from '../actions/classes/doTurn'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import JoinGameDialog from '../components/classes/JoinGameDialog'
import TurnButton from '../components/classes/TurnButton'

const playerShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  name: PropTypes.string
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

  doTurnWithGameId = (weapon) => () => {
    return this.props.doTurn(weapon, this.props.group._id)
  }

  render() {
    const { group } = this.props

    if (!group) return null

    const title = group.students.map(p => (p.name || null))
      .filter(n => !!n)
      .join(' vs ')

    return (
      <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className="Game">
        <h1>Pick Your Weapon</h1>
        <p>{title}</p>

        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
          <TurnButton
            onClick={this.doTurnWithGameId('rock')}
            weapon="rock"
          />
          <TurnButton
            onClick={this.doTurnWithGameId('paper')}
            weapon="paper"
          />
          <TurnButton
            onClick={this.doTurnWithGameId('scissors')}
            weapon="scissors"
          />
        </div>

        <JoinGameDialog classId={group._id} />
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
  doTurn
})(Class)
