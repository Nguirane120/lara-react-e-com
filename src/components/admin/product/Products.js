import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        axios.get(`api/all-product`).then((res) =>{
            if(res.data.status == 200)
            {
               setProducts(res.data.products)
            }
            setLoading(false)
        })
    }, [])

    let fetchProducts = ''

    if(loading)
    {
        return(
            <h1>Loading products...</h1>
        )
    }else{
        fetchProducts = products.map((item, index) =>{
            return(
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>{item.selling_price}</td>
                    <td><Link className='btn btn-warning btn-sm'>Edit</Link></td>
                    <td><Link className='btn btn-danger btn-sm'>Delete</Link></td>
                </tr>
            )
        })
    }

  return (
    <div className="container">
        <div className="card mt-4">
            <div className="card-header">
                <h1>List of products
                    <Link to='/admin/add-product' className='btn btn-primary float-end'>Add product</Link>
                </h1>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Selling</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            { fetchProducts}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Products