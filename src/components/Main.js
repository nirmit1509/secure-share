import React, { Component } from 'react';
import "../css/Main-style.css";
 
class Main extends Component {

  render() {
    return (
        <div>
            <p>&nbsp;</p>
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card text-center" id="odd1">
                            <div className="card-body text-dark">
                                <h4 className="card-title">My Uploads</h4>
                                <p className="card-text text secondary">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae vitae labore molestias illo similique omnis, alias qui quaerat veniam dolor!
                                </p>
                                <a href="/myUploads" className="btn btn-outline-success">Click here</a>
                            </div>
                        </div>    
                    </div>
                    <div className="col-md-6">
                        <div className="card text-center" id="even1">  
                            <div className="card-body text-dark">
                                <h4 className="card-title">Pending Requests</h4>
                                <p className="card-text text secondary">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae vitae labore molestias illo similique omnis, alias qui quaerat veniam dolor!
                                </p>
                                <a href="/pending" className="btn btn-outline-success">Click here</a>
                            </div>
                        </div>    
                    </div>                    
                </div>
            </div>    
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card text-center" id="odd2">
                            <div className="card-body text-dark">
                                <h4 className="card-title">Request a file</h4>
                                <p className="card-text text secondary">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae vitae labore molestias illo similique omnis, alias qui quaerat veniam dolor!
                                </p>
                                <a href="/request" className="btn btn-outline-success">Click here</a>
                            </div>
                        </div>    
                    </div>
                    <div className="col-md-6">
                        <div className="card text-center" id="even2">  
                            <div className="card-body text-dark">
                                <h4 className="card-title">Shared With Me</h4>
                                <p className="card-text text secondary">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae vitae labore molestias illo similique omnis, alias qui quaerat veniam dolor!
                                </p>
                                <a href="/shared" className="btn btn-outline-success">Click here</a>
                            </div>
                        </div>    
                    </div>
                    {/* <div className="col-md-4">
                        <div className="card text-center" id="odd2">  
                            <div className="card-body text-dark">
                                <h4 className="card-title">Card Title</h4>
                                <p className="card-text text secondary">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae vitae labore molestias illo similique omnis, alias qui quaerat veniam dolor!
                                </p>
                                <a href="#" className="btn btn-outline-success">Click here</a>
                            </div>
                        </div>    
                    </div> */}
                    
                </div>
            </div> 
        </div>
    );
  }
}

export default Main;