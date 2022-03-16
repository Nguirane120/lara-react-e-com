import React from 'react'
import { Route } from 'react-router-dom'
import FrontendLayout from './FrontendLayout'

const RoutePublic = ({rest}) => {
    return (
        <>
            <Route {...rest} render={(props) => <FrontendLayout {...props}/>} />
        </>
    )
}

export default RoutePublic