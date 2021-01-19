import {combineReducers} from 'redux'
import messageReducer from './messageReducer'
import statusReducer from './statusRedicer'


const rootReducer = combineReducers({
	status: statusReducer,
	message: messageReducer,
})

export default rootReducer
