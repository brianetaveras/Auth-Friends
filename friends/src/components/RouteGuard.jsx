import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export default function RouteGuard({component: Component, ...rest}){

    let LoggedIn = localStorage.getItem('token');

    return (
        <Route
        {...rest}
        render={props=>{
            return LoggedIn ? <Component {...props} /> : <Redirect to="/login"/>
        }}
        />

       
    )

}