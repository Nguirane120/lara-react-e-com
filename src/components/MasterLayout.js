import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import SideNavbar from './Sidebar'
import '../asset/css/styles.css'
import '../asset/js/scripts.js'
import routes from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'

const MasterLayout = () => {
  return (
      <>
        <div className="sb-nav fixed">
        <Navbar/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <SideNavbar/>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        {
                            routes.map((route, index) =>{
                                return(
                                    route.component &&(
                                        <Route 
                                        key={index}
                                        exact={route.exact}
                                        path={ route.path} 
                                        name={ route.name }
                                        render={(props) =>(
                                            <route.component {...props} />
                                        )}
                                        
                                        />
                                    )
                                )
                            })
                        }
                        <Redirect from="/admin" to="/admin/dashboard"/>
                    </Switch>
                </main>
                <Footer/>
            </div>   
        </div>
        </div>
    </>
  )
}

export default MasterLayout