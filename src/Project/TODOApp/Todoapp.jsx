import { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "./Todoapp.css";

export default function Todoapp() {
  let [todolist, setToDoList] = useState([]);
  let saveToDoList = (event) => {
    event.preventDefault();
    let toname = event.target.toname.value;


  if(toname == ""){
    NotificationManager.info('Please enter your work first');
  }
    else if (!todolist.includes(toname)) {
    
      let finalData = [...todolist, toname];
      setToDoList(finalData);
      NotificationManager.success("Successfully Added in your ToDo list");
    }
 

    else   {
      NotificationManager.error("Already Exist");
    }


  };


  
  let items = todolist.map((val,i)=>{
    return(
        <ToDoListItem val={val} key={i} todolist={todolist} setToDoList={setToDoList} keyNumber={i}/>
    )
  })

  return (
    <>
      <div className="container text-center my-4 ">
        <div className="heading">
          <h1>ToDo App</h1>
        </div>
        <form onSubmit={saveToDoList}>
          <input type="text" placeholder="Enter your to do work here..." className="w-100" name="toname" />
          <button
            className="btn btn-danger ms-1 w-100 mt-4"
            style={{ width: "100px",fontWeight:"bolder" }}
          >
            Save
          </button>
        </form>
        <div className="outerDiv">
            <ul>
          {items}
            </ul>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}
function ToDoListItem({val,todolist,setToDoList,keyNumber}){
    let [status,setStatus]=useState(false)
    let deleteRow=()=>{
        let finalData=todolist.filter((v,i)=>i!=keyNumber)
        setToDoList(finalData)
        NotificationManager.success("Successfully removed from List");
    }
  
    return(
        <li className={(status)?"completetodo":""} onClick={()=>{setStatus(!status)}}> {keyNumber+1}. {val}<span onClick={deleteRow}>&times;</span> </li>
    )
}