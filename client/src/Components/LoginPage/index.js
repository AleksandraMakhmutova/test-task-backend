import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {authLogin} from '../../redux/actions/actions'


function LoginPage() {

  let dispatch = useDispatch()
const history = useHistory()
  const [name, setName] = useState("")
  const [pass, setPass] = useState("")

  const handlerName = (e) => setName(e.target.value)
  const handlerPass = (e) => setPass(e.target.value)


  let login = () => {

    if (name.trim() && pass.trim()) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let data = {
        name,
        pass
      }

      data = JSON.stringify(data);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
      };

      fetch("/login", requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch(authLogin({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
					}))
					history.replace('/')
        })
        .catch(error => console.log('error', error));
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault()
    login()
  }


  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handlerSubmit}>
        <div className="form-group">
          <input placeholder={'Login'} type="name" className="form-control" onChange={handlerName} value={name} />
        </div>
        <div>
          <input placeholder={'Pass'} type="password" className="form-control" onChange={handlerPass} value={pass}  /> 
        </div> 
        <div className={'d-flex my-4 justify-content-center'}>
         <button type="submit" className="btn btn-primary">Войти</button>
        </div>  
      </form>
    </div>
  );
}

export default LoginPage
