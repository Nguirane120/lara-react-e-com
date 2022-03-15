import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const EditProduct = (props) => {

    const [categoriList, setCategoriList] = useState()
    const [picture, setPicture] = useState([])

 
   const [error_list, setErrorList] = useState([])
   const [loading, setLoadning] = useState(true)
   const history = useHistory()
 
    const [products, setProducts] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',
        meta_title:'',
        meta_keywords:'',
        meta_description:'',
        selling_price:'',
        original_price:'',
        qt:'',
        brand:'',
        feature:'',
        popular:'',
        status:'',
    })
 
    const {category_id, slug, name, description, meta_title, meta_description, meta_keywords, selling_price, original_price, qt, brand,} = products
    const handleChange = (e) =>{
        e.persist()
        setProducts({...products, [e.target.name]: e.target.value})
    }
 
    const handleImage = e =>{
          e.persist()
         setPicture({image: e.target.files[0]})
    }


    useEffect(() =>{
        axios.get(`api/show-category`).then((res) =>{
        setCategoriList(res.data.categories)
        })

        const produc_id = props.match.params.id

        axios.get(`api/edit-product/${produc_id}`).then((res) =>{
            if(res.data.status === 200)
            {
                setProducts(res.data.product)
                setAllChecked(res.data.product)
            }

            else if(res.data.status === 404)
            {
                swal("Error", res.data.error, 'error')
                history.push('/admin/products')

            }

            setLoadning(false)
        })
    }, [props.match.params.id])

    const [allChecked, setAllChecked] = useState([])

    const handleChecked = (e) =>{
        e.persist()
        setAllChecked({...allChecked, [e.target.name]: e.target.checked})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        const formDate = new FormData()
        formDate.append('image', picture.image);
        formDate.append('category_id', category_id);
        formDate.append('slug', slug);
        formDate.append('name', name);
        formDate.append('description', description);

        formDate.append('meta_title', meta_title);
        formDate.append('meta_keywords', meta_keywords );
        formDate.append('meta_description', meta_description );
        // formDate.append('meta_description', meta_description );

        formDate.append('selling_price', selling_price );
        formDate.append('original_price', original_price );
        formDate.append('qt', qt );
        formDate.append('brand', brand );
        formDate.append('feature', allChecked.feature ? '1' : '0');
        formDate.append('popular', allChecked.popular ? '1' : '0');
        formDate.append('status', allChecked.status ? '1' : '0');
        const produc_id = props.match.params.id

        axios.post(`api/update-product/${produc_id}`, formDate).then( res =>{
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, 'success')
                console.log(allChecked)
                setErrorList([])
                history.push('/admin/products')
            }
            else if(res.data.status == 422)
            {
                swal("All field are manditory",'', 'error')
                setErrorList(res.data.errors)
            }
            
        })
    }

if(loading)
{
    return(
        <h1>Loading products....</h1>
    )
}

  return (
    <div className="container">

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit product
                        <Link to='/admin/products' className='btn btn-primary float-end'>View prouct</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form  encType='multipart/form-data' onSubmit={handleSubmit}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Seo Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Other</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="card-body borded">
                                    <div className="form-group mb-3">
                                        <label>Select Category</label>
                                        <select className="form-select" name='category_id' onChange={handleChange} value={category_id} aria-label="Default select example">
                                           
                                            <option>Select Category</option>
                                           {
                                               categoriList && categoriList.map((category) =>{
                                                   return(
                                                       <>
                                                        <option value={category.id} key={category.id}>{category.name}</option>
                                                        
                                                       </>
                                                   )
                                               })
                                           }
                                        </select>
                                        <small className='text-danger'>{error_list.category_id}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Slug</label>
                                        <small>{error_list.slug}</small>
                                        <input type="text" name="slug" id="" className="form-control" onChange={handleChange} value={slug}/>

                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Name</label>
                                        <input type="text" name="name" id="" className="form-control" onChange={handleChange} value={name}/>
                                        <small className='text-danger'>{error_list.name}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Description</label>
                                        <textarea name="description" className="form-control" onChange={handleChange} value={description}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="form-group py-4">
                                    <label htmlFor="">Meta title</label>
                                    <input type="text" name="meta_title" id="" className="form-control" onChange={handleChange} value={meta_title}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="">Meta Keywords</label>
                                    <input type="text" name="meta_keywords" id="" className="form-control" onChange={handleChange} value={meta_keywords}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="">Meta Description</label>
                                    <input type="text" name="meta_description" id="" className="form-control" onChange={handleChange} value={meta_description}/>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Selling price</label>
                                        <input type="text" name="selling_price" id="" className="form-control" onChange={handleChange} value={selling_price}/>
                                        <small className='text-danger'>{error_list.selling_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Original price</label>
                                        <input type="text" name="original_price" id="" className="form-control" onChange={handleChange} value={original_price}/>
                                        <small className='text-danger'>{error_list.original_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Quantity</label>
                                        <input type="text" name="qt" id="" className="form-control" onChange={handleChange} value={qt}/>
                                        <small className='text-danger'>{error_list.qt}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Brand</label>
                                        <input type="text" name="brand" id="" className="form-control" onChange={handleChange} value={brand}/>
                                        <small className='text-danger'>{error_list.brand}</small>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label htmlFor="">Image</label>
                                        <img src={`http://127.0.0.1:8000/${products.image}`} alt={name} width="50px" />
                                        <input type="file" name="image" onChange={handleImage}  className="form-control" />
                                        <small className='text-danger'>{error_list.image}</small>
                                    </div>
                                    {/* <div className="col-md-8 form-group mb-3">
                                        <label htmlFor="">Featured (Checked-shown)</label>
                                        <input type="text" name="feature" id="" className="form-control w-50 h-50" onChange={handleChange} value={feature}/>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label htmlFor="">Popular (Checked-shown)</label>
                                        <input type="text" name="popular" id="" className="form-control w-50 h-50" onChange={handleChange} value={popular}/>
                                    </div> */}


                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Featured (Checked-shown)</label>
                                        <input type="checkbox" name="feature" id="" className="w-50 h-50" onChange={handleChecked} defaultChecked={allChecked.feature == 1 ? true : false}/>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Popular  (Checked-shown)</label>
                                        <input type="checkbox" name="popular" id="" className="w-50 h-50" onChange={handleChecked} defaultChecked={allChecked.popular === 1 ? true : false}/>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="">Status (Checked-hidden)</label>
                                        <input type="checkbox" name="status" id="" className="w-50 h-50" onChange={handleChecked} defaultChecked={allChecked.status === 1 ? true : false}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn px-4 btn-primary float-center mt-4">ADD</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default EditProduct