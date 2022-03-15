import React, { useState } from 'react'
import Navbar from '../frontend/Navbar'
import axios from 'axios'
// import Swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'


const Register = () => {



    const [ register, setRegister] = useState({
        name:"",
        email:"",
        password:"",
        error_list:[]
    })

    const history = useHistory()

    const handleChange = (e) =>{
        e.persist()
        setRegister({...register, [e.target.name]: e.target.value})
    }

    const { name, email, password, error_list} = register

    const handlesubmit = (e) =>{
        e.preventDefault()

        const data = {
            name:register.name,
            email:register.email,
            password:register.password,
           
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            console.log(response)
            axios.post(`api/register`, data).then((res) =>{
                if(res.data.status == 200){
                    localStorage.setItem('auth_token', res.data.token)
                    localStorage.setItem('auth_name', res.data.username)
                    swal("Succes ", res.data.message, 'success')
                    history.push('/')
    
                }
                // else if(res.data.status == 402)
                // {
                //     swal("Warning ", res.data.message, 'warning')
                // }
                else{
                    setRegister({...register, error_list: res.data.validation_errors})
                }
               
            })
            
        });
        
        
        
    }


  return (
      <>
      <Navbar/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 py-5">
                    <div className="card">
                        <div className="card-header">Registration</div>
                        <div className="card-body">
                            <form onSubmit={handlesubmit}>
                            <div className="form-group mb-3">
                                <label>Full Name</label>
                                <input type="text" name="name" onChange={handleChange} value={name} id="" className='form-control' />
                                <span>{error_list.name}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Email</label>
                                <input type="email" name="email"onChange={handleChange} value={email} className='form-control' />
                                <span>{error_list.email}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Password</label>
                                <input type="password" name="password" onChange={handleChange} value={password} className='form-control' />
                                <span>{error_list.password}</span>
                            </div>
                            <div className="form-group mb-3">
                                <button type='submit' className='btn btn-primary'>Register</button>
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

export default Register