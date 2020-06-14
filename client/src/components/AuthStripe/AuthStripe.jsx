import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { MakeAuthStripeRequest } from '../../redux/StripeReducer'
import queryString from 'query-string'
import ErrorMessage from '../common/ServerResponses/ErrorMessage'
import { compose } from 'redux'
import { SuccessErrorsData } from '../../hoc/SuccessErrorsData'

const AuthStripe = (props) => {
 debugger
    useEffect(() => {
        const { location: { search } } = props;
        const values = queryString.parse(search);
       props.MakeAuthStripeRequest(values.code)
    });
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
    {props.errors&&props.errors.id === 'STRIPE_AUTH_FAIL' ? <ErrorMessage message={props.errors.message}/>:<p>Hello User <span style={{color:"pink",fontWeight:"bold"}}>{props.stripeUserId}</span></p>}
                </div>
            </div>
        </div>
         
        </>
       
    )
}

let MapStateToProps=(state)=>{
    return{
        stripeUserId:state.stripe.stripeUserId
    }
}
export default compose(
    SuccessErrorsData,
connect(MapStateToProps, { MakeAuthStripeRequest })
)(AuthStripe)