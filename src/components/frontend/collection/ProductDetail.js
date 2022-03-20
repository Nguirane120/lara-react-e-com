import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const ProductDetail = (props) => {

    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const [quantity, setQuantity] = useState(1)

    const handleIncrement = () =>{
        if(quantity < 10)
        {
            setQuantity(prevewCount => prevewCount + 1)
        }
    }

    const handleDecrement = () =>{
        if(quantity > 1)
        {
            setQuantity(prevewCount => prevewCount - 1)
        }
    }

    useEffect(() => {
   
        const product_slug = props.match.params.product
        const category_slug = props.match.params.category
        axios.get(`api/product-detail/${category_slug}/${product_slug}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product_data.product)
                setCategory(res.data.product_data.category)
                setLoading(false)
                
            }

            else if (res.data.status === 404) {
                swal("Warning", res.data.message, 'warning')
                history.push('/collection')
            }
        })
      
    }, [])

 
    const SubmitToCart = e =>{
        e.preventDefault()
        const data = {
            product_id: product.id,
            product_qty: quantity
        }

        axios.post(`api/add-to-cart`, data).then( res =>{
            if(res.data.status === 201)
            {
                swal("Success", res.data.message, 'success')
            }
            else if(res.data.status === 401)
            {
                swal("Warning", res.data.message, 'warning')
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, 'error')
            }
            else if(res.data.status === 409)
            {
                swal("Warning", res.data.message, 'warning')
            }
            // else if(res.data.status === 401)
            // {
            //     swal("Error", res.data.message, 'error')
            // }
            // else if(res.data.status === 404)
            // {
            //     swal("Error", res.data.message, 'error')
            // }

            // console.log(res.data)
            
        })
        // console.log(data)
    }
 
    let availableStock = ''

    if (loading) {
        return <h1>Loading product details....</h1>
    }
    else {

        if (product.qt > 0) {
            availableStock = <div>
                <label htmlFor="" className="btn btn-sm btn-success px-4 mt-2">
                    In stock
                </label>
                <div className="row">
                    
                    <div className="row">
                        <div className="col-md-3 mt-3">
                            <div className="input-group">
                                <button type='button' onClick={handleDecrement} className="input-group-text">-</button>
                                <div  className="form-control">{quantity}</div>
                                <button type='button' onClick={handleIncrement} className="input-group-text">+</button>
                            </div>
                        </div>
                        <div className="col-md-3 mt-3">
                            <button className="btn btn-primary w-100" onClick={SubmitToCart}>Add to cart</button>
                            
                    </div>
                    </div>
                </div>
            </div>

        }

        else{
            availableStock = <label htmlFor="" className="btn btn-sm btn-danger px-4 mt-2">
            Out of stock
        </label>
        }

    }
    return (
        <>
            <div className="bg-warning py-3">
                <div className="container">
                    <h1 className="text-center">Collection / {product.category.name}/{product.name}</h1>
                </div>
            </div>
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-4 border-end">
                        <img src={`https://api-lara-react.herokuapp.com/${product.image}`} alt={product.name} className="w-100" />
                    </div>
                    <div className="col-md-8">
                        <h4>{product.name}
                            <span className="float-end badge btn btn-danger badge-pill">{product.brand}</span>
                        </h4>
                        <p>{product.description}</p>
                        <h4 className="mb-1">
                            Rs {product.selling_price}
                            <s className="ms-2"> rs {product.original_price}</s>
                        </h4>
                        <div>
                           
                            {availableStock}
                        </div>
                        <button className="btn btn-danger mt-3">Add to whishlist</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail