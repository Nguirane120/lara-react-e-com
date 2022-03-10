import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import swal from 'sweetalert'

const EditCategory = (props) => {


    const [category, setCategory] = useState([])
    const history = useHistory()
    const [loading, setLoadning] = useState(true)
    const [error, setError] = useState([])

    // const { slug, name, description,status, meta_title, meta_keywords, meta_description, error_list} = category

    const handleChange = (e) =>{
        e.persist()
        setCategory({...category, [e.target.name]:e.target.value})
    }

    useEffect(() => {
        const category_id = props.match.params.id
        axios.get(`api/edit-category/${category_id}`).then((res) =>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category)
                setError([])
            }
            
            else if( res.data.status === 404){
                swal("Error", res.data.message, 'error')
                
            }
            setLoadning(false)
        })
    }, [props.match.params.id])
    

    const handleSubmit = (e) =>{
        e.preventDefault()
        const category_id = props.match.params.id
        const data = category;
        axios.put(`api/update-category/${category_id}`, data).then((res) =>{
            if(res.data.status === 200)
            {
                swal("Succes", res.data.message, 'success')
                history.push('/admin/show-category')
            }
            else if( res.data.status === 422){
                swal('Veuillez remplir tous les champ svp', '', 'error')
                setError(res.data.errors)

            }
        })
    }

    if(loading){
        return(
            <h1>Loading Category...</h1>
        )
    }

  return (
      <div className="container">
          <h1 className="text-center">Edit category</h1>
          <h1>Liste of categories  <Link to='/admin/show-category' className='btn btn-primary float-end'>Back</Link></h1>

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
        
        <input type="text" name="slug" id="" className="form-control " onChange={handleChange} value={category.slug} autoComplete='true'/>
        <span>{error.slug}</span>
        </div>
        <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
      
        <input type="text" name="name" id="" className="form-control mb-3"  onChange={handleChange} value={category.name} autoComplete='true'/>
        <span>{error.name}</span>
        </div>
       <div className="form-group mb-3">
       <label htmlFor="description">Description</label>
        <textarea name="description" id="" className="form-control mb-3"  onChange={handleChange} value={category.description}></textarea>
        </div>
        <div className="form-group mb-3">
        <label htmlFor="status">Status</label>
        <input type="checkbox" name="status" id="" className=" ms-2 " onChange={handleChange} value={category.status}/>
        </div>
    
    </div>
  <div className="tab-pane fade card-body border" id="seo-tag" role="tabpanel" aria-labelledby="seo-tag-tab">
   <div className="form-grou">
   <label>Meta Title</label>
  
        <input type="text" name="meta_title" id="" className="form-control ms-2 " onChange={handleChange} value={category.meta_title} autoComplete='false'/>
    </div>
  <div className="form-group mb-3">
        <label>Meta Keywords</label>
        <input type="text" name="meta_keywords" id="" className="form-control" onChange={handleChange} value={category.meta_keywords} autoComplete='false'/>
    </div>
  <div className="form-group">
        <label>Meta Description</label>
        <textarea name="meta_description" id="" className="form-control" onChange={handleChange} value={category.meta_description}></textarea>
    </div>
    
    </div>


</div>
<button type="submit" className="btn btn-primary float-end mt-4">Update</button>
</form>
          </div>
    
  )
}

export default EditCategory