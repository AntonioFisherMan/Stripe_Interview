import './NavBar.css';
import React from 'react'
import { NavLink } from 'react-router-dom'


const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg ">
            <button className=" col-3 col-sm-1 navbar-toggler" id="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="navbar-toggler-icon fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav col-lg-6">
                    <li >
                        <NavLink to="/">Main<span className="sr-only">(current)</span></NavLink>
                    </li>
                </ul>

            </div>
            <div className=" nav__account col-2 col-sm-2 col-lg-1 d-flex align-items flex-column">
    {props.props.isAuth && props.props.user ? <NavLink className="d-flex flex-column align-items-center"activeStyle={{ color: "#E77E83" }} to="/"><p style={{paddingTop:'5px'}}onClick={props.logout}>Logout</p><NavLink activeStyle={{ color: "#E77E83" }} to="/account">{props.props.user.name}</NavLink></NavLink> : <NavLink activeStyle={{ color: "#E77E83" }} to="/register"><img src="/images/account.svg" className="ml-auto" alt="Account" /></NavLink>}
            </div>

        </nav>
    )

}
export default NavBar