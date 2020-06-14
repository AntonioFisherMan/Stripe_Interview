import React from 'react'
import { ReduxLoginForm } from './LoginForm'
import {login} from '../../../redux/AuthReducer.js'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { SuccessErrorsData } from '../../../hoc/SuccessErrorsData'
import { Redirect } from 'react-router-dom'




class Login extends React.Component{
    onSubmit = (formData) => {
       this.props.login(formData.email, formData.pass,formData.remember_me)
    }
 render(){
    if (this.props.isAuth) {
        return <Redirect to="/account" />
    }
     return(
         <ReduxLoginForm onSubmit={this.onSubmit} errors={this.props.errors} />
     )
 }
}

let mapStateToProps=(state)=>{
    return{
        isAuth:state.auth.isAuth
    }
}
export default compose(
    SuccessErrorsData,
    connect(mapStateToProps,{login})
)(Login)

