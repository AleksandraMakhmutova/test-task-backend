import React from 'react'

import { useHistory } from 'react-router-dom';


function TaskOne({task}) {

	const history = useHistory()

const handleEdit = (e) => {
	const id = e.target.id
history.replace(`/edit/:${id}`)
}

	return (
		<>
		
		{ task && task.map(el=> (
		<li key={el.id} className="list-group-item" onClick={handleEdit} id={el.id}> {el.username} / {el.email} / {el.text} / {el.status}</li>
		))
		}
	
</>
	)
}

export default TaskOne


      