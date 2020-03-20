import { ORDER_SET_IS_BEING_UPDATED, USER_SET_STATUS, USER_UPDATE_ORDERS } from './actionTypes'
import { authenticateWithFirebase, fetchOrders, signOutFromFirebase } from '../firebase'
import { status } from '../user'
import api from '../api'

export function setUserStatus (status) {
  return {
    type: USER_SET_STATUS,
    status
  }
}

export function login ({email, password}) {
  return async (dispatch, getState) => {
    const state = getState()
    let userStatus = status.LOGGING_IN
    dispatch(setUserStatus(userStatus))

    try {
      await authenticateWithFirebase(email, password)
      // userStatus = status.LOGGED_IN
    } catch (e) {
      console.log('login., ~ Line 12: e >', e)
    }
  }
}

export async function logout (dispatch, getState) {
  const state = getState()
  let userStatus = status.LOGGING_OUT
  dispatch(setUserStatus(userStatus))

  try {
    await signOutFromFirebase()
    // userStatus = status.LOGGED_IN
  } catch (e) {
    console.log('login., ~ Line 12: e >', e)
  }
}

export async function updateOrders (dispatch) {
  try {
    const orders = await fetchOrders()
    dispatch({type: USER_UPDATE_ORDERS, orders})
  } catch (e) {
    // TODO: retry ?
  }
}

export function amendSingleOrder (id, values) {
  return async (dispatch, getState) => {
    const state = getState()
    dispatch({type: ORDER_SET_IS_BEING_UPDATED, isBeingUpdated: true})

    try {
      await api.updateOrder(id, values)
    } catch (e) {
      console.log('login., ~ Line 12: e >', e)
    }

    dispatch({type: ORDER_SET_IS_BEING_UPDATED, isBeingUpdated: undefined})
  }
}
