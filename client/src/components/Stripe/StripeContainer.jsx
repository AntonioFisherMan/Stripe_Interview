import React from 'react'
import Stripe from './Stripe'
import {connect} from 'react-redux'
import {MakePayment,GetProducts} from '../../redux/StripeReducer'

class StripeContainer extends React.Component{
    componentDidMount(){
        this.props.GetProducts()
    }
    render(){
        return (
        <>
          <Stripe {...this.props}/>
        </> 
        )
    }
}

let mapStateToProps=(state)=>{
    return{
        products:state.stripe.products,
        successOrder:state.stripe.successOrder
    }
}
export default connect(mapStateToProps,{MakePayment,GetProducts})(StripeContainer)
