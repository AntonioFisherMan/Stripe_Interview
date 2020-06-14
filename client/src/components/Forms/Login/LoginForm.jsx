import React from 'react'
import { reduxForm, Field, } from 'redux-form'
import { required, MinLength, MaxLength } from '../../common/validators'
import {Link } from 'react-router-dom'
import {Input} from '../FormControls/Input'
import '../SignPage.css'
import ErrorMessage from '../../common/ServerResponses/ErrorMessage'


const MaxLengthCreator50 = MaxLength(50)
const MinLengthCreator5 = MinLength(5)

const LoginForm = (props) => {
    return (
        <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src="/images/signin-image.jpg" alt=""/></figure>
                        <Link to="register" className="signup-image-link" style={{color:"pink"}}>Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Sign up</h2>
                        <form  className="register-form" id="login-form" onSubmit={props.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <Field component={Input} validate={[required,MinLengthCreator5,MaxLengthCreator50]}   id="your_name" type="text" name="email" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <Field component={Input} validate={[required,MinLengthCreator5,MaxLengthCreator50]}   id="your_pass" type="password" name="pass" placeholder="Password" />
                              
                            </div>
                            <div className="form-group">
        
                                <Field type="checkbox" component={"input"} name="remember_me" id="remember-me" className="agree-term"  />
                                <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            
                            <div className="form-group form-button">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            
                        </form>
                        {props.errors&&props.errors.id === 'LOGIN_FAIL' ? <ErrorMessage message={props.errors.message}/>:null}
                    </div>
                </div>
            </div>
        </section>
    )
}

export const ReduxLoginForm=reduxForm({
        form:"login"
})(LoginForm)

