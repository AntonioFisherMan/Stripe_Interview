import React from 'react'
import { ReduxRegisterForm } from './RegisterForm'
import {register} from '../../../redux/AuthReducer.js'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { SuccessErrorsData } from '../../../hoc/SuccessErrorsData'
import { Redirect } from 'react-router-dom'



class Register extends React.Component{
    onSubmit = (formData) => {
       this.props.register(formData.registerName,formData.registerEmail, formData.registerPass,formData.agree_term)
    }
 render(){
    if (this.props.isAuth) {
        return <Redirect to="/account" />
    }
     return(
         <ReduxRegisterForm onSubmit={this.onSubmit} errors={this.props.errors} />
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
    connect(mapStateToProps,{register})
)(Register)
