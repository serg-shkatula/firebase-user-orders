import { USER_SET_STATUS } from './actionTypes'
import { authenticateWithFirebase } from '../firebase'
import { status } from '../user'

export function login ({email, password}) {
  return async (dispatch, getState) => {
    const state = getState()
    let userStatus = status.LOGGING_IN
    dispatch({type: USER_SET_STATUS, status: userStatus})

    try {
      await authenticateWithFirebase(email, password)
      userStatus = status.LOGGED_IN
    }catch (e) {
      console.log('login., ~ Line 12: e >', e)
      userStatus = status.LOGGED_OUT
    }

    dispatch({type: USER_SET_STATUS, status: userStatus})
  }
}
