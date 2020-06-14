import { testAPI } from "../api/api";
import {returnErrors} from './SuccessErrorsReducer'


const SET_PRODUCTS_AC="SET_PRODUCTS_AC"
const SET_SUCCESS_PAYMENT="SET_SUCCESS_PAYMENT"
const REMOVE_SUCCESS_PAYMENT="REMOVE_SUCCESS_PAYMENT"
const SET_STRIPE_USER_ID="SET_STRIPE_USER_ID"
const CLEAR_STRIPE_USER_ID="CLEAR_STRIPE_USER_ID"


const initialState={
 products:[],
 successOrder:false,
 stripeUserId:null
}

const StripeReducer=(state=initialState,action)=>{
    switch(action.type){
     case SET_PRODUCTS_AC:
     return{...state,products:[...action.products]}
     case SET_SUCCESS_PAYMENT:
       
    return{...state,successOrder:true}
    case REMOVE_SUCCESS_PAYMENT:
        return{...state,successOrder:false}
case SET_STRIPE_USER_ID:
    return{...state,stripeUserId:action.userId}
    case CLEAR_STRIPE_USER_ID:
        return{...state,stripeUserId:null}
     default:return state
    }
}

//ACTIONS
const SetProductsAction=(products)=>({type:SET_PRODUCTS_AC,products})
const SetSuccessPayment=()=>({type:SET_SUCCESS_PAYMENT})
const SetStripeUserId=(userId)=>({type:SET_STRIPE_USER_ID,userId})
export const RemoveSuccessOrder=()=>({type:REMOVE_SUCCESS_PAYMENT})
export const ClearStripeUserId=()=>({type:CLEAR_STRIPE_USER_ID})

//THUNK 
export const MakePayment=(data)=>dispatch=>{
    testAPI.makePaymentRequest(data).then(res=>{
        if(res.data.resultCode===0){
            dispatch(SetSuccessPayment())
        }
    }).catch(err=>{
        debugger
    dispatch(returnErrors(err.response.data.message,err.response.status,"BUY_STRIPE_PRODUCT_FAIL"))  
    })
}
export const GetProducts=()=>dispatch=>{
    testAPI.getProductsRequest().then(res=>{
        dispatch(SetProductsAction(res.data.products))
    })
}
export const GetRequestStripe=()=>dispatch=>{
    testAPI.requestStripeAuth()
}
export const MakeAuthStripeRequest=(code)=>dispatch=>{
    testAPI.makeAuthStripeRequest(code).then(res=>{
    dispatch(SetStripeUserId(res.data.item.stripe_user_id))
    }).catch(err=>{
        if(err.response.data.message.raw.response)dispatch(returnErrors(err.response.data.message.raw.response.error.message,err.response.data.message.type,"STRIPE_AUTH_FAIL"))  
    })
}


export default StripeReducer