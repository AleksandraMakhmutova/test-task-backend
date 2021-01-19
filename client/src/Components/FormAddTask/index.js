import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../redux/actions/actions';
import { v4 as uuidv4 } from 'uuid';


function FormAddTask() {
const dispatch = useDispatch()

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
			
    }
  }

	return (
				<form onSubmit={handleSubmit}>
									<div class="form-group">
												<input type="text" className="form-control" name="username" placeholder='Имя' onChange={handleChange} value={username} required/>
												</div>
												<div class="form-group">
														<input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={email} required/>
												</div>
												<div class="form-group">
												<textarea className="form-control" cols="30" rows="10" name="text" placeholder='Сообщение...' onChange={handleChange} value={text} required></textarea>
										</div>
										<div className="button">
										<button type="submit" className="btn btn-primary">Отправить</button>
										</div>
								</form>
	)
}

export default FormAddTask
