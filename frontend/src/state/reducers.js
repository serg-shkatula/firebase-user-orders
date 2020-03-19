import { USER_SET_STATUS } from './actionTypes'

export function user (state = {}, {type, status}) {
  switch (type) {
    case USER_SET_STATUS:
      return {
        ...state,
        status: status,
      };
  }
  return state;
}
