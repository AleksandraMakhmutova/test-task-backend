import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addMessageToRedux} from '../../redux/actions/actions';



function Task() {
	const dispatch = useDispatch();
	
const task = useSelector((state) => state.message.message)
	useEffect(() => {
		fetch('http://localhost:3355/tasks')
		.then(response =>response.json())
		.then(data=>dispatch(addMessageToRedux(data.message.tasks)))
}, [task, dispatch])


	return (
		<>
		<div class="card">
 <div class="card-header">
    Tasks
  </div>
 <div class="card-body">
		<ul className="list-group">
		{ task && task.map(el=> (
  <li key={el.id}className="list-group-item">{el.username} / {el.email} / {el.text} / {el.status}</li>
		))
		}
		</ul>
</div>
		</div>
		{ task &&
<div>Общее колличество задач: {task.length}</div>}
</>
	)
}

export default Task
