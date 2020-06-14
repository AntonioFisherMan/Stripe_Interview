import React from 'react'
import { connect } from 'react-redux'
import {logout} from '../../redux/AuthReducer'
import Nav from './Nav'



class NavContainer extends React.Component{
   
  render(){
      
      return(
         <Nav {...this.props}/>
      )
  }
}

let mapStateToProps = (state) => {  
    return {
       isAuth:state.auth.isAuth,
       user:state.auth.user
    }
}
export default connect(mapStateToProps,{logout})(NavContainer)





