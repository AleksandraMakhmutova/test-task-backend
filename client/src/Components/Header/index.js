import React from 'react'
import { NavLink } from 'react-router-dom';

function Header() {
	return (
		<ul class="nav">
  <li class="nav-item">
    <NavLink to="#" className="nav-link active">Вход</NavLink>
  </li>
</ul>
	)
}

export default Header
