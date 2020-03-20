import { ORDER_SET_IS_BEING_UPDATED, USER_SET_STATUS, USER_UPDATE_ORDERS } from './actionTypes'

export function user (state = {}, action) {
  switch (action.type) {
    case USER_SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    case USER_UPDATE_ORDERS:
      return {
        ...state,
        orders: action.orders,
      }
  }
  return state
}

export function order (state = {}, action) {
  switch (action.type) {
    case ORDER_SET_IS_BEING_UPDATED:
      return {
        ...state,
        isBeingUpdated: action.isBeingUpdated,
      }
  }
  return state
}
