import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const ViewProduct = (props) => {

    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
    // let isMounted = true
    const product_slug = props.match.params.slug
    axios.get(`api/getProduct/${product_slug}`).then( res =>{
        if(res.data.status === 200)
        {
            setProduct(res.data.product_data.product)
            setCategory(res.data.product_data.category)
            setLoading(false)

        }

        else if(res.data.status === 400)
        {

        }
        else if(res.data.status === 404)
        {
            swal("Warning", res.data.message, 'warning')
            history.push('/collection')
        }
    })
    //   return () => {
    //     isMounted = false
    //   }
    }, [])

    let displayProduct = ''
    const productCount = product.length

    if(loading)
    {
        return <h1>Loading product....</h1>
    }
    else{
        if(productCount)
        {
            
            displayProduct =  product.map((item, index) =>{
                return(
                    <>
                        <div className="col-md-3" >
                            <div className="card" key={index}>
                                <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                                    <img src={`https://api-lara-react.herokuapp.com/${item.image}`} className="w-100" alt={item.name} />
                                </Link>
                                <div className="card-body">
                                    <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                                    <h5>{item.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
        }
        else
        {
            displayProduct = <div className="col-md-12"><h4>No Product available for {category.name} </h4></div>
        }
    }

    
  return (
      <>
    <div className="bg-warning py-3">
        <div className="container">
          <h1 className="text-center">Collection / {category.name}</h1>
        </div>
      </div>
        <div className="container">
          <div className="row">
            {
               displayProduct
            }
          </div>
        </div>
    </>
  )
}

export default ViewProduct