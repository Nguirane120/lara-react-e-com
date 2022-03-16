import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ViewCategories = () => {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    let isMounted = true
    axios.get(`api/view-category`).then((res) =>{
      if(isMounted)
      {
        if(res.data.status == 200)
      {

        console.log(res.data)
        setCategories(res.data.category)
        setLoading(false)
      }
      }
    })

    return () =>{
      isMounted = false
    }
  }, [])

  let displayCategories = '';
  
  if(loading)
  {
    return(
      <h1>Loading categories...</h1>
    )
  }
  else{
    

    displayCategories = categories && categories.map((item, index) =>{
      return(
        <div className="col-md-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <Link to={`collection/${item.slug}`}>
                    <img src="" alt={item.name} />
                  </Link>
                  <Link to={`collection/${item.slug}`}>
                  <h4>{item.name}</h4>
                  </Link>
                </div>
              </div>
            </div>
      )
    })
  }
  return (
    <>
      <div className="bg-warning py-3">
        <div className="container">
          <h1 className="text-center">Cateegory page</h1>
        </div>
        <div className="container">
          <div className="row">
          { displayCategories }
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewCategories