import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../redux/actions/actions';

import { useHistory, useParams } from 'react-router-dom';


function EditPage() {
const dispatch = useDispatch()
const { id } = useParams();
const isAuth = useSelector(state=> state.user.isAuth)
console.log(">>>>>",isAuth);
const [inputs, setInputs] = useState({
	username:"",
	email:"",
	text:""
})


useEffect(()=>{
	fetch(`/edit/${id}`)
	.then(res=> res.json())
	.then(data=> 
	setInputs({
		username: data[0].username,
		email: data[0].email,
		text:data[0].text
	})
	)
},[])
const history = useHistory()


	const { username, email, text } = inputs;
	
	function handleChange({ target: { name, value } }) {
    setInputs({
      ...inputs,
      [name]: value
    })
	}
	
	async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch(`/edit/${id}`, {
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
		if (res.status === 200) {
			history.replace('/')
		}
		if(res.status === 404){
			history.replace('/page_not_found')
		}
  }

	return (
<>
 <div className="d-flex justify-content-center ml-3">
 {
	isAuth ?
				<form onSubmit={handleSubmit}>
									<div className="form-group">
												<input type="text" className="form-control" name="username" onChange={handleChange} value={username} required/>
												</div>
												<div className="form-group">
														<input type="email" name="email" className="form-control" onChange={handleChange} value={email} required/>
												</div>
												<div className="form-group">
												<textarea className="form-control" cols="15" rows="4" name="text"  onChange={handleChange} value={text} required></textarea>
										</div>
										<div className="'d-flex my-4 justify-content-center'">
										<button type="submit" className="btn btn-primary">Редактировать</button>
										</div>
								</form>:<p>Войдите для редактирования задачи.</p>
								}
    </div> 	
										
</>
	)
}

export default EditPage
