import * as TYPES from "../types/types.js"


const messageReducer = (state = [], action) => {
  switch (action.type) {
		case TYPES.ADD_TASKS:
			return ({...state, message: action.payload})
			case TYPES.ADD_NEW:
				return ({...state, message: action.payload})
    default:
      return state
  }
}

export default messageReducer
