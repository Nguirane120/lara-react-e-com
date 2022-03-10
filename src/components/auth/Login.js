import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../frontend/Navbar'

const Login = () => {

   const [login, setLogin] = useState({
       email:'',
       password:'',
       error_list:[]
   })

   const {email, password} = login;
   const history = useHistory()

   const handleChange = (e) =>{
       e.persist()
       setLogin({...login, [e.target.name]: e.target.value})
   }

   const handleSubmit = (e) =>{
       e.preventDefault()
       const data = {
           email,
           password
       }

    //    axios.get('/sanctum/csrf-cookie').then(response => {
       
    // });
    axios.post(`api/login`, data).then((res) =>{
        if( res.data.status === 200){
             localStorage.setItem('auth_token', res.data.token)
             localStorage.setItem('auth_name', res.data.username)
             swal("Success", res.data.message, 'success')
             history.push('/')
        }

        else if(res.data.status === 401)
        {
             swal('Warning', res.data.message,  'error')
        }

        else
        {
         setLogin({...login, error_list: res.data.validation_errors})
         history.push('/')
        }
       
        
    })

   }

   const { error_list} = login

  return (
    <>
        <Navbar/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 py-5">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input type="email" name="email" onChange={handleChange} value={email} className='form-control' />
                                <span>{error_list.email}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={handleChange} value={password} className='form-control' />
                                <span>{error_list.password}</span>
                            </div>
                            <div className="form-group mb-3">
                                <button type='submit' className='btn btn-primary'>Login</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login