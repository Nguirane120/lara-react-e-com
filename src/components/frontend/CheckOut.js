import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const CheckOut = () => {
    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    let totalCartPrice = 0;
    const [error, setError] = useState([])
    const [checkout, setCheckout] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        address:'',
        state:'',
        city:'',
        zipcode:''
    })

    const { firstName, lastName, email, phone, address, state, city, zipcode} = checkout


useEffect(() => {
  axios.get(`api/carts`).then( res =>{
      if(res.data.status === 200)
      {
          setCarts(res.data.cart)
          setLoading(false)
      }

      else if(res.data.status === 401)
      {
          history.push('/')
          swal('Error', res.data.message, 'error')
      }
  })

  
}, [history])


const handlechange = (e)=>{
    setCheckout({...checkout, [e.target.name]:e.target.value})
}

const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
        firstName,
        lastName,
        email,
        phone,
        address,
        state,
        city,
        zipcode
    }
    axios.post(`api/place-order`, data).then((res) =>{
        if( res.data.status === 200)
        {
            swal("Order placed succesfully", res.data.message, 'success')
            setError([])
            history.push('/tank-u')
        }
        else if(res.data.status === 422)
        {
            swal('All field are required', '', 'error')
            setError(res.data.errors)

        }
    })
}


if(loading)
{
    return <h1>Loading carts data...</h1>
}

let check_html = ''

if(carts.length > 0)
{
    check_html =   <div className="row">
    <div className="col-md-7">
        <div className="card">
            <div className="card-header">
                <h4>Basic Information</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input type="text" name="firstName" onChange={handlechange} value={firstName} className="form-control mb-3" />
                        <small className="text-danger">{error.firstName}</small>
                        </div>
                    </div>
                        
                    <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastName" onChange={handlechange} value={lastName}  className="form-control mb-3" />
                        <small className="text-danger">{error.lastName}</small>
                        </div>
                    </div>
                        <div className="col-md-6">
                        <div className="form-group">
                        <label htmlFor="">Email Address</label>
                        <input type="text" name="email" onChange={handlechange} value={email}  className="form-control mb-3" />
                        <small className="text-danger">{error.email}</small>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" name="phone" onChange={handlechange} value={phone}  className="form-control mb-3" />
                        <small className="text-danger">{error.phone}</small>
                        </div>
                        </div>
                        <div className="col-md-12">
                            <label>Full Address</label>
                            <textarea name="address" onChange={handlechange} value={address}  rows="3" className='form-control mb-3'>
                            <small className="text-danger">{error.address}</small>
                            </textarea>
                        </div> <div className="col-md-4">
                        <div className="form-group">
                        <label htmlFor="">City</label>
                        <input type="text" name="city" onChange={handlechange} value={city}  className="form-control mb-3" />
                        <small className="text-danger">{error.city}</small>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="form-group">
                        <label htmlFor="">State</label>
                        <input type="text" name="state" onChange={handlechange} value={state}  className="form-control mb-3" />
                        <small className="text-danger">{error.state}</small>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="form-group">
                        <label htmlFor="">Zip code</label>
                        <input type="text" name="zipcode" onChange={handlechange} value={zipcode}  className="form-control mb-3" />
                        <small className="text-danger">{error.zipcode}</small>
                        </div>
                        </div>

                </div>
                <div className="col-md-12 text-center">

                    <button type="submit" className='btn btn-primary btn-large'>Send</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div className="col-md-5">
        <table className="table table-borded">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    carts.map((item, index) =>{
                        totalCartPrice += item.product.selling_price * item.product_qty
                        return(
                            <tr key={index}>
                                <td>{item.product.name}</td>
                                <td>{item.product.selling_price}</td>
                                <td>{item.product_qty}</td>
                                <td>{item.product.selling_price * item.product_qty}</td>
                            </tr>
                        )
                    })

                }
                <tr>
                    <td colSpan="2" className='text-end fw-bold'>Grand Total</td>
                    <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
}  
 else {

    check_html = <div className="card card-body py-5 text-center shadow-sm">
        <h4>Your shopping cart is empty</h4>
    </div>
 }
  return (
    <div className="container py-3">
       {check_html}
    </div>
  )
}

export default CheckOut