
import './App.css';

import Header from './Components/Header';
import LoginPage from './Components/LoginPage';
import Task from './Components/Task';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditPage from './Components/EditPage';

function App() {
  return (
		 <div className="mt-5 mb-5">
	 <BrowserRouter>
	 <Header />
	 <Switch>
	 <Route exact path="/">
	 <Task/>
          </Route>
					<Route exact path="/login">
<LoginPage/>
			 </Route>
			 <Route exact path="/edit/:id">
<EditPage/>
			 </Route>		
					</Switch>
</BrowserRouter>
</div>
  );
}

export default App;
