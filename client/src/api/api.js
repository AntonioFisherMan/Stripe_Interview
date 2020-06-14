import * as axios from "axios";

const baseUrl = "https://interview-stripe.herokuapp.com/";

export const testAPI = {
  login(email, password, rememberMe = false) {
    return axios.post(baseUrl + "auth/", {
      email,
      password,
      rememberMe,
    });
  },
  register(name, email, password) {
    return axios.post(baseUrl + "auth/user", { name, email, password });
  },
  makePaymentRequest(data){
    return axios.post(baseUrl+"payment",{data})
  },
  makeAuthStripeRequest(code){
    debugger
    return axios.post(baseUrl+"auth/stripe",{code})
  },
  getProductsRequest(){
    return axios.get(baseUrl+"products")
  },
  requestStripeAuth(){
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };
    return axios.get(`https://connect.stripe.com/oauth/authorize`,config)
  },
  stripeDeauthorize(stripeId,clientId){
    debugger
    return axios.post(baseUrl+'auth/deauthorize',{stripeId,clientId})
  }

};
