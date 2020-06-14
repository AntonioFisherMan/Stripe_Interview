


import { testAPI } from "../api/api";
import {returnErrors} from './SuccessErrorsReducer'
import {ClearStripeUserId} from './StripeReducer'

  const USER_LOADING = "USER_LOADING";
  const USER_LOADED = "USER_LOADED";
  const AUTH_ERROR = "AUTH_ERROR";
  const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  const LOGIN_FAIL = "LOGIN_FAIL";
  const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
  const REGISTER_SUCCESS = "REGISTER_SUCCESS";
  const REGISTER_FAIL = "REGISTER_FAIL";
  

  
  const initialState = {
    token: sessionStorage.getItem("token") || null,
    isAuth: sessionStorage.getItem("isAuth") || false,
    isLoading: false,
    user: JSON.parse(sessionStorage.getItem("user")) ||null,
  };
  
  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOADING:
        return { ...state, isLoading: true };
      case USER_LOADED:
        debugger
  
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("isAuth", true);
        return{...state,isAuth:true,token:action.payload.token,user:action.payload.user}
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("isAuth", true);
        return{...state,isAuth:true,token:action.payload.token,user:action.payload.user}

      case AUTH_ERROR:
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case LOGOUT_SUCCESS:
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isAuth",false);
        return {
          ...state,
          isAuth: false,
          isLoading: false,
          user: null,
          token: null
        };
  
      default:
        return state;
    }
  };
  
  export const userLoad = (payload) => ({type: USER_LOADED,payload});
  

  export const login = (email, password, rememberMe) => async (dispatch) => {
    dispatch({ type: USER_LOADING });
    testAPI.login(email, password, rememberMe).then((res) => {
        dispatch(userLoad(res.data,res.data.inform));
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch((err) => {
       dispatch(returnErrors(err.response.data.message,err.response.status,"LOGIN_FAIL"));
        dispatch({ type: LOGIN_FAIL });
      });
  };
  
  export const register = (name, email, password) => (dispatch) => {
    testAPI.register(name, email, password).then((res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch(userLoad(res.data));
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };
  
  export const logout = () => (dispatch,getState) => {
    dispatch({ type: LOGOUT_SUCCESS });
    testAPI.stripeDeauthorize(getState().stripe.stripeUserId,"ca_HRRy5LDYgjjaJEOMX72ZW8Pm36cKmsN2").then(res=>{
      dispatch(ClearStripeUserId())
    }).catch(err=>{
   if(err.response.data.message.raw)dispatch(returnErrors(err.response.data.message.raw.message,err.response.data.message.type,"STRIPE_DEAUTH_FAIL"))  
    })
  };

  
  export default AuthReducer;
  