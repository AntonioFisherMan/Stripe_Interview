import React from 'react';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';

let mapStateToProps=(state)=>{
    return{
     auth:state.auth.isAuth
    }
}


 export const WithAuthRedirect=(Component)=>{
    const RedirectComponent=(props)=> {
        if(!props.auth) return <Redirect to={"/login"}/>
           return <Component {...props}/>
    }  
    let Connect=connect(mapStateToProps)(RedirectComponent)
    return Connect
}

