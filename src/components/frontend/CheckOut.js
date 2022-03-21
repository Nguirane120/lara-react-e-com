import React from 'react'

const CheckOut = () => {
  return (
    <div className="container py-3">
        <div className="row">
            <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h4>Basic Information</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <input type="text" name="firstname" id="" className="form-control mb-3" />
                                </div>
                            </div>
                                
                            <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="lastname" id="" className="form-control mb-3" />
                                </div>
                            </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="">Email Address</label>
                                <input type="text" name="email" id="" className="form-control mb-3" />
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                <label htmlFor="">Phone Number</label>
                                <input type="text" name="phone" id="" className="form-control mb-3" />
                                </div>
                                </div>
                                <div className="col-md-12">
                                    <label>Full Address</label>
                                    <textarea name="" id="" rows="3" className='form-control mb-3'>
                                    </textarea>
                                </div> <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="">City</label>
                                <input type="text" name="city" id="" className="form-control mb-3" />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="">State</label>
                                <input type="text" name="state" id="" className="form-control mb-3" />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="">Zip code</label>
                                <input type="text" name="zipcode" id="" className="form-control mb-3" />
                                </div>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
  )
}

export default CheckOut