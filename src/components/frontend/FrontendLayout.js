import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import publicRoutes from './PublicRouteList'

const FrontendLayout = () => {
    return (
        <>
        <Navbar/>
            <main>
                <Switch>
                    {
                        publicRoutes.map((route, index) => {
                            return (
                                route.component && (
                                    <Route
                                        key={index}
                                        exact={route.exact}
                                        path={route.path}
                                        name={route.name}
                                        render={(props) => (
                                            <route.component {...props} />
                                        )}

                                    />
                                )
                            )
                        })
                    }
                    <Redirect from="/admin" to="/admin/dashboard" />
                </Switch>
            </main>
        </>
    )
}

export default FrontendLayout