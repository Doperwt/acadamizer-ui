// src/reducers/classes.js
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
      const groupIds = state.map(g => g._id)
      if (groupIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((group) => {
        if (group._id === payload._id) {
          return { ...payload }
        }
        return group
      })

    case CLASS_CREATED :
      const newGame = { ...payload }
      return [newGame].concat(state)

    case CLASS_UPDATED :
      return state.map((group) => {
        if (group._id === payload._id) {
          return { ...payload }
        }
        return group
      })

    case CLASS_STUDENTS_UPDATED :
      return state.map((group) => {
        if (group._id === payload.group._id) {
          return { ...payload.group, students: payload.students }
        }
        return group
      })

    case CLASS_REMOVED :
        return state.filter((group) => (group._id !== payload._id))



    default :
      return state

  }
}
