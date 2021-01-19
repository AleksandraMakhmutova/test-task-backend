import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addMessageToRedux} from '../../redux/actions/actions';
import FormAddTask from '../FormAddTask';



function Task() {
	const dispatch = useDispatch();
	const history = useHistory()
const task = useSelector((state) => state.message.message)
	useEffect(() => {
		fetch('http://localhost:3355/tasks')
		.then(response =>response.json())
		.then(data=>dispatch(addMessageToRedux(data.message.tasks)))
}, [dispatch])

const handleEdit = (e) => {
	const id = e.target.id
history.replace(`/edit/:${id}`)
}

	return (
		<>
<div className="d-flex justify-content-center mt-5">
	<div className="form-group">
		<ul className="list-group">
		{ task && task.map(el=> (
  <li key={el.id} className="list-group-item" onClick={handleEdit} id={el.id}>{el.username} / {el.email} / {el.text} / {el.status}</li>
		))
		}
		</ul>
</div>
<FormAddTask/>
		</div>
		{ task &&
<div className="d-flex justify-content-center mt-5">Общее колличество задач: {task.length}</div>}
</>
	)
}

export default Task


      