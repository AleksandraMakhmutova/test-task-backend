import * as TYPES from "../types/types"

export const addStatusToRedux = (status)=>{
  return {
    type: TYPES.STATUS_ADD,
    payload: status
  }
}
export const statusAddToAction = () => async (dispatch, getState) => {
	const response = await fetch('http://localhost:3355/tasks')
	const result = await response.json()
	console.log(result.status);
  dispatch(addStatusToRedux(result.status))
};


export const addMessageToRedux = (tasks)=>{
  return {
    type: TYPES.ADD_TASKS,
    payload: tasks
  }
}

export const addNewTask = (newTasks)=>{
	return {
    type: TYPES.ADD_TASKS,
    payload: newTasks
  }
}


export const authLogin = (tokens) =>{
	return {
    type: TYPES.STATUS_AUTH,
    payload: {...tokens}
  }
}

export const authLoginOut = (tokens) =>{
	return {
    type: TYPES.STATUS_AUTH_OUT,
    payload: {...tokens}
  }
}



