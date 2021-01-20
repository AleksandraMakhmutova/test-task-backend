import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addMessageToRedux} from '../../redux/actions/actions';
import FormAddTask from '../FormAddTask';
import TaskOne from '../TaskOne';



function Task() {
	const dispatch = useDispatch();

const task = useSelector((state) => state.message.message)
	useEffect(() => {
		fetch('http://localhost:3355/tasks')
		.then(response =>response.json())
		.then(data=>dispatch(addMessageToRedux(data.message.tasks)))
}, [task])

	return (
		<>
<div className="d-flex justify-content-center mt-5">
	<div className="form-group">

	<ul className="list-group">
	<TaskOne task={task}/>	</ul>
</div>
<FormAddTask/>
		</div>
		{ task &&
<div className="d-flex justify-content-center mt-5">Общее колличество задач: {task.length}</div>}
</>
	)
}

export default Task


      