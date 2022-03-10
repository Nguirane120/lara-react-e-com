import axios from 'axios'
import React, {useState} from 'react'
import swal from 'sweetalert'

const AddCategory = () => {


    const [category, setCategory] = useState({
        slug:'',
        name:'',
        description:'',
        status:'',
        meta_title:'',
        meta_keywords:'',
        meta_description:'',
        error_list:[]

    })

    const { slug, name, description,status, meta_title, meta_keywords, meta_description, error_list} = category

    const handleChange = (e) =>{
        e.persist()
        setCategory({...category, [e.target.name]:e.target.value})
    }

const handleSubmit = (e) =>{
    e.preventDefault()
    const data = {
        slug,
        name,
        description,
        meta_title,
        meta_keywords,
        meta_description,
        status
    }

    axios.post(`api/add-category`, data).then( res =>{
        if(res.data.status === 200){
            swal("Success", res.data.message, 'success')
            setCategory('')
        }else if( res.data.status === 400){
            setCategory({...category, error_list:res.data.errors})
            console.log(error_list.slug)
        }
        
    })
}

let display_errors = []

if(error_list){
    display_errors = [
        error_list.slug,
        error_list.meta_title,
        error_list.name
    ]
}

  return (
    <>
    <div className="container-fluid px-4">
        <h1 className="mx-4">Add Category</h1>
        {
            display_errors.map( (item, index)=>{
                return(
                    <p className='text-danger' key={index}>{item}</p>
                )
            })
        }
    <form onSubmit={handleSubmit}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="seo-tag-tab" data-bs-toggle="tab" data-bs-target="#seo-tag" type="button" role="tab" aria-controls="seo-tag" aria-selected="false">SEO Tags</button>
  </li>

</ul>
<div className="tab-content" id="myTabContent">
    
  <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="form-group mb-3">
        <label htmlFor="slug">Slug</label>
        
        <input type="text" name="slug" id="" className="form-control " onChange={handleChange} value={slug} autoComplete='true'/>
        </div>
        <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
      
        <input type="text" name="name" id="" className="form-control mb-3"  onChange={handleChange} value={name} autoComplete='true'/>
        </div>
       <div className="form-group mb-3">
       <label htmlFor="description">Description</label>
        <textarea name="description" id="" className="form-control mb-3"  onChange={handleChange} value={description}></textarea>
        </div>
        <div className="form-group mb-3">
        <label htmlFor="status">Status</label>
        <input type="checkbox" name="status" id="" className=" ms-2 " onChange={handleChange} value={status}/>
        </div>
    
    </div>
  <div className="tab-pane fade card-body border" id="seo-tag" role="tabpanel" aria-labelledby="seo-tag-tab">
   <div className="form-grou">
   <label>Meta Title</label>
  
        <input type="text" name="meta_title" id="" className="form-control ms-2 " onChange={handleChange} value={meta_title} autoComplete='false'/>
    </div>
  <div className="form-group mb-3">
        <label>Meta Keywords</label>
        <input type="text" name="meta_keywords" id="" className="form-control" onChange={handleChange} value={meta_keywords} autoComplete='false'/>
    </div>
  <div className="form-group">
        <label>Meta Description</label>
        <textarea name="meta_description" id="" className="form-control" onChange={handleChange} value={meta_description}></textarea>
    </div>
    
    </div>


</div>
<button type="submit" className="btn btn-primary float-end mt-4">Add</button>
</form>
    </div>
    </>
  )
}

export default AddCategory