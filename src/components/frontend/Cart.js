import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const Cart = () => {


    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()




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

const updateCartQty = (cart_id, scoop) =>{
    axios.put(`api/update-carteQty/${cart_id}/${scoop}`).then((res) =>{
        if(res.data.status === 200){
            // console.log(res.data.cartItem)
        }
    })
}
const handleDecrement  = cart_id =>{
    setCarts(
        carts.map((item) =>
            cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1: 0)} : item
        )
    )
    updateCartQty(cart_id, 'dec')
 }

 const handleIncrement  = cart_id =>{
    setCarts(
           carts.map((item) =>
               cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1: 0)} : item
           )
       )
       updateCartQty(cart_id, 'inc')
}

if(loading)
{
    return <h1>Loading carts data...</h1>
}

let existingCart = '';

if(carts.length > 0)
{
    existingCart = <div className="table-responsive">
    <table className="table table-borded">
        <thead>
            <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Price</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {
                carts.map(( item, index) =>{
                    return(
                    <tr>
                        <td width="10%" key={index}> 
                            <img src={`https://api-lara-react.herokuapp.com/${item.product.image}`} alt={item.product.name} width="50px" height="50px"/>
                        </td>
                    
                    <td>{item.product.name}</td>
                    <td width="15%" className="text-center">{item.product.selling_price}</td>
                    <td width="15%">
                        <div className="input-group">
                            <button className="input-group-text" onClick={() => handleDecrement(item.id)}>-</button>
                            <div className="form-control text-center" >{item.product_qty}</div>
                            <button className="input-group-text" onClick={() => handleIncrement(item.id)}>+</button>
                        </div>
                    </td>
                    <td width="15%" className="text-center">{item.product.selling_price * item.product_qty}</td>
                    </tr>

                    )
                })
            }
        </tbody>
    </table>
</div>
}
else{
   existingCart =  <div className="card card-body py-5 text-center shadow-sm">
       <h4>Your shopping cart is empty</h4>
   </div>
}
  return (
    <>
         <div className="bg-warning py-3">
                <div className="container">
                    <h1 className="text-center">HOME / Cart</h1>
                </div>
            </div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-12">
                        { existingCart}
                    </div>
                </div>
            </div>
    </>
  )
}

export default Cart