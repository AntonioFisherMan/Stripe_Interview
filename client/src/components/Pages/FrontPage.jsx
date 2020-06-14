import React from 'react'
import StripeContainer from '../Stripe/StripeContainer'
import { connect } from 'react-redux'
import styled from "styled-components";
import {SuccessErrorsData} from '../../hoc/SuccessErrorsData'
import { Link } from 'react-router-dom'
import { RemoveSuccessOrder,MakeAuthStripeRequest } from '../../redux/StripeReducer'
import ErrorMessage from '../common/ServerResponses/ErrorMessage'
import {compose} from 'react-redux' 


const FrontPage = (props) => {
    const closeModal = () => {
        props.RemoveSuccessOrder()
    }
    return (
        <div className="container">
            <StripeContainer />
            {props.successOrder ? <ModalContainer>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto col-md-8 col-lg-4 p-5 text-center text-capitalize" id="modal" >
                            <h3 style={{color:"pink"}}>Your order successfuly paid</h3>
                            <Link to="/">
                               <button type="button" onClick={() => { closeModal(); }}class="btn btn-success">   Continue Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </ModalContainer> : <div>{props.errors&&props.errors.id === 'BUY_STRIPE_PRODUCT_FAIL' ? <ErrorMessage message={props.errors.message}/>:null}</div>}
        </div>
    );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: white
  }
  @media (max-width: 575.98px) {
    #modal {
      height:100%;
      font-size:14px !important;
    }
    #modal img{
      height:200px;
    }
  }
  
`;

let mapStateToProps = (state) => {
    return {
        successOrder: state.stripe.successOrder
    }
}
export default compose(
  SuccessErrorsData,
  connect(mapStateToProps, { RemoveSuccessOrder,MakeAuthStripeRequest })
)(FrontPage)




