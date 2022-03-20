import axios from 'axios'
import React from 'react'
import { Link, useHistory} from 'react-router-dom'
import swal from 'sweetalert'

const Navbar = () => {

  let AuthButton = ''
  const history = useHistory()

  const logOutSubmit = (e) =>{
    e.preventDefault()
    // axios.post(`api/logout`).then( res =>{
    //   if(res.data.status == 200){
        
    // }

    // })
    localStorage.removeItem('auth_token')
        // localStorage.removeItem('auth_name')
        // swal("Succes ", res.data.message, 'success')
        history.push('/login')
  }
  if(!localStorage.getItem('auth_token')){

    AuthButton = (
      <ul className='navbar-nav'>
         <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register" >Register</Link>
        </li>
      </ul>
    )
  }
  else{
    AuthButton = (
      <ul className="navbar-nav">
         <li className="nav-item">
          <button className="nav-link btn-danger btn-sm text-light" onClick={logOutSubmit}>Logout</button>
        </li>
        </ul>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky top">
    <div className="container">
      <Link className="navbar-brand" to="/">E-Comm</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/collection">Collection</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/cart">Cart</Link>
          </li>
         {
           AuthButton
         }
           {/* <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register" >Register</Link>
        </li>
          */}
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar