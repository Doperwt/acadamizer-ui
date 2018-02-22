// src/actions/classes/addReview.js
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export default (groupId,studentId,update) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    const {date,review,description} = update
    api.patch(`/classes/${groupId}/students/${studentId}`, {date:date,review:review,description:description})
      .then(() => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
