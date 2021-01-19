import { useSelector } from 'react-redux'

import {
  Link
} from "react-router-dom";


function Header() {

const isAuth = useSelector(state=> state.user.isAuth)




	return (
		<div className="row flex-nowrap justify-content-between align-items-center">
<div className="col-4 pt-1">
		<div className="container d-flex  mr-10">
		<Link className="btn btn-sm btn-outline-secondary" to="/">Tasks</Link>
			{!isAuth ? 
			<Link className="btn btn-sm btn-outline-secondary" to="/login">Войти</Link>
			:
			<Link className="btn btn-sm btn-outline-secondary" to="/logout">Выйти</Link>
			}
			</div>
			</div>
			</div>
  
	)
}

export default Header

