import * as TYPES from "../types/types.js"


const statusReducer = (state = [], action) => {
  switch (action.type) {
		case TYPES.STATUS_ADD:
			return ({...state, status: action.payload})
    default:
      return state
  }
}

export default statusReducer
