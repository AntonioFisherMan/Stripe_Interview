import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required, MaxLength,MinLength } from '../../common/validators'
import {Input} from '../FormControls/Input'
import {Link} from 'react-router-dom'
import '../SignPage.css'
import ErrorMessage from '../../common/ServerResponses/ErrorMessage'


const MaxLengthCreator50 = MaxLength(50)
const MinLengthCreator5 = MinLength(5)


const RegisterForm = (props) => {
    return (
        <section class="signup">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Sign up</h2>
                    <form  class="register-form" id="register-form" onSubmit={props.handleSubmit}>
                        <div class="form-group">
                            <label htmlFor="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                            <Field component={Input} validate={[required,MinLengthCreator5,MaxLengthCreator50]}   type="text" name="registerName" id="name" placeholder="Your Name" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="email"><i class="zmdi zmdi-email"></i></label>
                            <Field component={Input} validate={[required,MinLengthCreator5,MaxLengthCreator50]}  type="email" name="registerEmail" id="email" placeholder="Your Email"/>
                        </div>
                        <div class="form-group">
                            <label htmlFor="pass"><i class="zmdi zmdi-lock"></i></label>
                            <Field component={Input} validate={[required,MinLengthCreator5,MaxLengthCreator50]}   type="password" name="registerPass" id="pass" placeholder="Password"/>
                        </div>
                     
                        <div class="form-group">
                            <Field type="checkbox" component="input" name="agree_term" id="agree-term" class="agree-term" />
                            <label htmlFor="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <Link to="#" class="term-service">Terms of service</Link></label>
                        </div>
                        <div class="form-group form-button">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    {props.errors&&props.errors.id === 'REGISTER_FAIL' ? <ErrorMessage message={props.errors.message}/>:null}
                </div>
                <div class="signup-image">
                    <figure><img src="/images/signup-image.jpg" alt=""/></figure>
                    <Link to="/login" class="signup-image-link" style={{color:"pink"}}>I am already member</Link>
                </div>
            </div>
        </div>
    </section>
       
    )
}

export const ReduxRegisterForm=reduxForm({
    form:"register"
})(RegisterForm)