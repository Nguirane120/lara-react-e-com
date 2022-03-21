import { Route, Switch,BrowserRouter as  Router, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar';
import MasterLayout from './components/MasterLayout';
import Sidebar from './components/Sidebar';
import Dashboard from './components/admin/Dashboard';
import Profile from './components/admin/Profile';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';

import axios from 'axios'
import AdminProectedRoute from './components/admin/AdminProectedRoute';
import About from './components/frontend/About';
import Contact from './components/frontend/Contact';
// import FrontendLayout from './components/frontend/FrontendLayout';
import RoutePublic from './components/frontend/RoutePublic';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://api-lara-react.herokuapp.com/"
axios.defaults.baseURL = "http://127.0.0.1:8000/"
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.interceptors.request.use( config =>{
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config
})


function App() {
  return (
    <>
  
          <Router>
      <Switch>
        <AdminProectedRoute path='/admin' name="Admin" />
            <RoutePublic path='/' name="Home"/>
            <Route path='/login'>
              { localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Login/>}
            </Route>
            <Route path='/register'>
              { localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Register/>}
            </Route>
            
      </Switch>
          </Router>
    </>
  );
}

export default App;
