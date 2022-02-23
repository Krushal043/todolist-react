import React, {useEffect, useState} from 'react';
import CreateTask from '../models/CreateTask'
import Card from './Card';



const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")

        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(taskList))
        setTaskList(taskList)
        setModal(false)
    }

    const d = new Date()
    const weekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const day = weekDay[d.getDay()]
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()
    const hour = d.getHours()
    const minutes = d.getMinutes()

    

    const checkExpiration = () => { 
        d.setDate(d.getDate() + 1); //one day from now
        taskList.push(d);
        localStorage.setItem('taskList', JSON.stringify(taskList))
    //check if past expiration date
        var values = JSON.parse(localStorage.getItem('taskList'));
    //check "d" index here
        if (values[1] < new Date() || values[1] === new Date()) {
            localStorage.removeItem("taskList")
    }
}

    // const checkTask = () => {
    // }

    // const filter = () => {

    // }

    return (
        <>
            <div className = "header text-center" >
                <div className="datetime">
                    <div className="date">
                        <span id="daynum">{day}day,</span>
                        <span id="dayname">{date}/</span>
                        <span id="month">{month}/</span>
                        <span id="year">{year}</span>
                    </div>
                    <div className="time">
                        <span id="hour">{hour} :</span>
                        <span id="minutes">{minutes}</span> 
                    </div>
                </div>
                <h3><b>Todo List</b></h3>
                <button className = "btn btn-primary mt-2 button"onClick = {() => setModal(true)} >Create Task</button>
                {/* <div className = "filter-container">
                    <button className = "btn btn-3" onClick={filter}>All</button>
                    <button className = "btn btn-3" onClick={filter}>Active</button>
                    <button className = "btn btn-3" onClick={filter}>Completed</button>
                </div>   */}
            </div>
            {checkExpiration}
            <div className = "task-container">  
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} key={index} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
            
        </>
    );
};

export default TodoList;