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
    default:
      return state
  }
}

export default userReducer
