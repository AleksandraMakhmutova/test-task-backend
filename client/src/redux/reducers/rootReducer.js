import {combineReducers} from 'redux'
import messageReducer from './messageReducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
	message: messageReducer,
	user: userReducer,
})

export default rootReducer
