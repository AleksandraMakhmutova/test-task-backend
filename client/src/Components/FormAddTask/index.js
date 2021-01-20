import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../redux/actions/actions';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';


function FormAddTask() {
const dispatch = useDispatch()
const history = useHistory()
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
		text: ""
  })

	const { username, email, text } = inputs;
	
	function handleChange({ target: { name, value } }) {
    setInputs({
      ...inputs,
      [name]: value
    })
	}
	
 const tasks = useSelector((state) => state.message.message)

	async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch('http://localhost:3355/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
				username,
				email,
				text
      })
		})
		tasks.push({
			"id": uuidv4(),
			"username": username,
			"email": email,
			"text": text,
			"status": 0
		})
		dispatch(addNewTask(tasks))
    
		if (res.status === 200) {
			setInputs({
				username: "",
				email: "",
				text: ""
			})
			history.replace('/')
    }
  }

	return (
		<div className="d-flex justify-content-center ml-3">
				<form onSubmit={handleSubmit}>
									<div className="form-group">
												<input type="text" className="form-control" name="username" placeholder='Имя' onChange={handleChange} value={username} required/>
												</div>
												<div className="form-group">
														<input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={email} required/>
												</div>
												<div className="form-group">
												<textarea className="form-control" cols="15" rows="4" name="text" placeholder='Task...' onChange={handleChange} value={text} required></textarea>
										</div>
										<div className="'d-flex my-4 justify-content-center'">
										<button type="submit" className="btn btn-primary">Добавить</button>
										</div>
								</form>
    </div>

	)
}

export default FormAddTask
