import * as TYPES from "../types/types.js"


const userReducer = (state = [], action) => {
  switch (action.type) {
		case TYPES.STATUS_AUTH:
			return { 
				...state,
					isAuth: true,
					tokens: {
						...action.payload,
					}}
					case TYPES.STATUS_AUTH_OUT:
			return { 
				...state,
					isAuth: false,
					tokens: {
					}}
    default:
      return state
  }
}

export default userReducer
