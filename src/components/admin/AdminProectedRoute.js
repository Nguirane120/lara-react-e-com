import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import MasterLayout from '../MasterLayout'

const AdminProectedRoute = ({...rest}) => {

    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
    axios.get(`api/checkAuthenticated`).then((res) =>{
        if(res.status === 200){

            setAuthenticated(true)
        }
        setLoading(false)
    })
      //     if(localStorage.getItem("auth_token")!=null)
      //   {
          
      //     setAuthenticated(true)
      //   }else{
      //     swal("Error", "veuillez-vous connectez svp", 'warning')
      //   }
      // setLoading(false)
      return () => {
        setAuthenticated(false)
      }
    }, [])



    axios.interceptors.response.use(undefined, (err) =>{   
     if(err.response.status === 401)
     {
       swal("UNAUTHORIZED", err.response.data.message, 'warning')
       history.push('/login')
     }

     return Promise.reject(err)

    })

    axios.interceptors.response.use(undefined, function(error){
      if(error.response.status === 403){
        swal("FORBIDEN", error.response.data.message, 'warning')
        history.push('/')
      }

      else if(error.response.status === 404)
      {
        swal("NOT FOUND", error.response.data.message, 'warning')
        history.push('/')
      }
      return Promise.reject(error)
    })


    if(loading){
        return <h1>Loading...</h1>
    }
    
  return (
    // <Route {...rest} 
    //     render={({props, location}) =>
    //     localStorage.getItem('auth_token') ?
    //     (<MasterLayout {...props}/>) : (<Redirect to={{ pathname:"/login", state: { from: location}}}/>)
    // }
    // />
    <Route {...rest} 
        render={({props, location}) =>
        authenticated ?
        (<MasterLayout {...props}/>) : (<Redirect to={{ pathname:"/login", state: { from: location}}}/>)
    }
    />
  )
}

export default AdminProectedRoute