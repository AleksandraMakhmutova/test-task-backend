import { useDispatch, useSelector } from 'react-redux'

import {
  Link, useHistory
} from "react-router-dom";
import { authLoginOut } from '../../redux/actions/actions';


function Header() {

const isAuth = useSelector(state=> state.user.isAuth)
const dispatch = useDispatch()
const history = useHistory()
const handleLogOut = ()=>{
	dispatch(authLoginOut({
		accessToken: '',
		refreshToken: ''
	}))
	history.replace('/')
}


	return (
		<div className="d-flex justify-content-center ml-3">
<div className="col-4 pt-1">
		<div className="container d-flex  mr-10">
		<Link className="btn btn-sm btn-outline-secondary" to="/">Tasks</Link>
			{!isAuth ? 
			<Link className="btn btn-sm btn-outline-secondary" to="/login">Войти</Link>
			:
			<Link className="btn btn-sm btn-outline-secondary" to="#" onClick={handleLogOut}>Выйти</Link>
			}
			</div>
			</div>
			</div>
  
	)
}

export default Header

