import React from 'react'
import "./navbar.css"
import { FaBook } from "react-icons/fa";
import {Link}from "react-router-dom"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
const Navbar = () => {
    const dispatch=useDispatch()
    const logout=()=>{
        sessionStorage.clear("id")
        dispatch(authActions.logout())
    }
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)
    console.log(isLoggedIn);
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <li className="navbar-brand" to="#">
                    <FaBook />&nbsp;TODO</li>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                className="nav-link active mx-2" aria-current="page" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                className="nav-link active mx-2" aria-current="page" to="/todo">Todo</Link>
                            </li>
                            
                                {!isLoggedIn && <><li className="nav-item">
                                <Link className="nav-link active btn-nav mx-2" aria-current="page" to="/signup">Sign up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active btn-nav mx-2" aria-current="page" to="/signin">Sign in</Link>
                            </li></>}
                            
                            
                               {isLoggedIn && <> <li className="nav-item">
                                <Link className="nav-link active btn-nav mx-2" aria-current="page" to="/" onClick={logout}>Log out</Link>
                            </li></>}
                            
                            
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    <img className="image"src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg" alt='user' />
                                </Link>
                            </li>
                            



                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
