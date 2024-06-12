import React from 'react'
import About from "./components/about/About"
import Navbar from "./components/navbar/Navbar"
import Home from "./components/home/Home"
import Footer from "./components/footer/Footer"
import Signup from "./components/signup/Signup"
import Signin from "./components/signin/Signin"
import Todo from './components/todo/Todo'
import { useDispatch } from 'react-redux';
import { authActions } from './store';



import {BrowserRouter as Router,Routes,Route}  from "react-router-dom"
import { useEffect } from 'react'

const App = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){dispatch(authActions.login());}
  },[])
  return (
    <div>
      <Router>
    <Navbar />
    <Routes>
    <Route  path="/" element={<Home />} />
    <Route  path="/about" element={<About />} />
    <Route  path="/todo" element={<Todo />} />
    <Route  path="/signup" element={<Signup />} />
    <Route  path="/signin" element={<Signin />} />
      
     
      </Routes>
      <Footer/>
      </Router>
     
     
    </div>
  )
}

export default App
