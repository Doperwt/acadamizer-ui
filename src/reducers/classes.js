// src/reducers/games.js
import { FETCHED_CLASSES, FETCHED_ONE_CLASS } from '../actions/classes/fetch'
import {
  CLASS_CREATED,
  CLASS_UPDATED,
  CLASS_REMOVED,
  CLASS_STUDENTS_UPDATED,
} from '../actions/classes/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_CLASSES :
      return [ ...payload ]

    case FETCHED_ONE_CLASS :
      const gameIds = state.map(g => g._id)
      if (gameIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((game) => {
        if (game._id === payload._id) {
          return { ...payload }
        }
        return game
      })

    case CLASS_CREATED :
      const newGame = { ...payload }
      return [newGame].concat(state)

    case CLASS_UPDATED :
      return state.map((game) => {
        if (game._id === payload._id) {
          return { ...payload }
        }
        return game
      })

    case CLASS_STUDENTS_UPDATED :
      return state.map((game) => {
        if (game._id === payload.game._id) {
          return { ...payload.game, players: payload.players }
        }
        return game
      })

    case CLASS_REMOVED :
        return state.filter((game) => (game._id !== payload._id))

    default :
      return state

  }
}
