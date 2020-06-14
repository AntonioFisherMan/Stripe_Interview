import React from 'react'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import './Account.css'
import { connect } from 'react-redux'
import { GetRequestStripe } from '../../redux/StripeReducer'

const Account = (props) => {
    const getRequestStripe = () => {
        props.GetRequestStripe()
    }

    return (
        <div className="container">
            <div className="row ">
                <div className="col-12 d-flex justify-content-center">
                    {props.stripeUserId?<p>Hello user <span style={{color:"pink",fontWeight:"bold"}}>{props.stripeUserId}</span></p>: <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_HRRy5LDYgjjaJEOMX72ZW8Pm36cKmsN2&scope=read_write&redirect_uri=https://interview-stripe.herokuapp.com/auth" onClick={()=>getRequestStripe()} className="stripe-connect"><span>Connect with Stripe</span></a>}
                </div>
            </div>
        </div>
    )
}


let MapStateToProps=(state)=>{
    return{
        stripeUserId:state.stripe.stripeUserId
    }
}
export default compose(
    WithAuthRedirect,
    connect(MapStateToProps, { GetRequestStripe })
)(Account)

