import React from 'react'
import "./todo.css"
import { useState } from 'react'
import Todocards from './Todocards';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Todoupdate from './Todoupdate';
import axios from "axios"

let id=sessionStorage.getItem("id")
let toupdateArray=[]
const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  // useEffect(()=>{
  //   const fetch=async()=>{
  //     await axios.get(`http://localhost:5000/api/v2/getTasks/${id}`).then((response)=>{console.log(response);})
  //   }
  //   fetch()
  // },[])
  
  
  const show = () => {

    document.getElementById("textarea").style.display = "block"
  }
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }
  
  const submit = async (e) => {
    e.preventDefault();
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or body should not be empty");
    } else {
      try {
        if (id) {
          await axios.post("http://localhost:5000/api/v2/addTask", { title: Inputs.title, body: Inputs.body, id: id })
            .then((response) => {
              console.log(response);
             
            });
            setInputs({ title: "", body: "" });
            toast.success("Your task is added");
        } 
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while adding your task");
      }
      setArray([...Array, Inputs]);
      setInputs({ title: "", body: "" });
    }
  }
  const del=async(Cardid)=>{
    if(id){
      await axios.delete(`http://localhost:5000/api/v2/deleteTask/${Cardid}`,{data:{id:id}})
    .then(()=>{
      toast.success("Your task is deleted");
    })
    }
    else{
      toast.error("Please sign up first");
    }
  
  }
  const dis=(value)=>{
 
    document.getElementById("todo-update").style.display=value
  }
  const update=(value)=>{
    toupdateArray=Array[value];
  }
  useEffect(() => {
    if(id){
      const fetch = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v2/getTasks/${id}`);
       setArray(response.data.list);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      fetch();
    }
    
  }, [submit]);
  return (
    <>
    <div className='todo'>
      <ToastContainer/>
      <div className="todo-container d-flex justify-content-center align-items-center flex-column">
        <div className='d-flex flex-column todo-inputs w-50 my-3'>
          <input type="text"
            placeholder='Title'
            className=' todo-input my-2 p-2'
            onClick={show}
            name='title'
            value={Inputs.title}
            onChange={change} />

          <textarea type="text"
            placeholder='Body'
            className=' todo-input p-2'
            id='textarea'
            name='body'
            value={Inputs.body}
            onChange={change} />

        </div>
        <div className='d-flex justify-content-end w-50 my-2'>
          <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
        </div>
      </div>
      <div className="todo-body">
        <div className="container-fluid">
          <div className="row">
            
              {Array && Array.map((item, index) =>
                
                  <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                    <Todocards 
                    title={item.title} 
                    body={item.body} 
                    id={item._id}
                     delid={del} 
                     display={dis}
                     updateid={index}
                     tobeUpdated={update}/>
                  </div>
                
              )}
            
          </div>

        </div>
      </div>
    </div>
    <div className="todo-update" id='todo-update'>
    <div className="container update">
    <Todoupdate display={dis} update={toupdateArray}/>
    </div>

    </div>
    </>
  )
 
}

export default Todo
