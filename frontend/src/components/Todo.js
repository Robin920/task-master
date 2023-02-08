import {useContext, useState} from "react"

import axios from "axios"

import userContext from "../context/userContext"

import bin from "../assets/icons/delete.png"
import edit from "../assets/icons/edit.png"
import star from "../assets/icons/star.png"
import starFill from "../assets/icons/star-fill.png"
import check from "../assets/icons/red-check.png"
import checked from "../assets/icons/check.png"

import TodoModal from "./TodoModal"
import EditTodo from "./EditTodo"
import DeleteModal from "./DeleteModal"

const Todo = ({todo, makeRequest, setMakeRequest}) => {

    const {user} = useContext(userContext)

    const [popup, setPopup] = useState(false);

    const [editTodo, setEditTodo] = useState(false);

    const [deleteTodo, setDeleteTodo] = useState(false);


    const handleHightlight = async (event, todo) => {
        try{
            event.preventDefault()
            let {_id, isImportant} = todo
            isImportant = !isImportant
            await axios.put(`/todo/${user.$id}/${_id}`, {isImportant})
            setMakeRequest(!makeRequest)
        } catch(error){
            console.log("Error while updating a todo in handleHightlight method")
            console.log("Error: ", error)
        }
    }

    

    const handleCompleted = async (event, todo) => {
        try{
            event.preventDefault()
            let {_id, isCompleted} = todo
            isCompleted = !isCompleted
            await axios.put(`/todo/${user.$id}/${_id}`, {isCompleted})
            setMakeRequest(!makeRequest)
        } catch(error){
            console.log("Error while updating a todo in handleCompleted method")
            console.log("Error: ", error)
        }
    }

    return(
        <>
            <div className="flex my-2 justify-center">
                <button 
                className={`
                    p-2
                    border-2 
                    border-blue-800
                    rounded 
                    active:bg-violet-100 
                    mx-3
                `}
                onClick={(e)=>handleHightlight(e, todo)}
                >
                    <img src={(todo.isImportant)?starFill:star} alt="Star Todo"/>
                </button>
                <p className={`
                    w-5/6 
                    border-2 
                    p-1
                    md:p-2 
                    rounded
                    text-[14px]
                    sm:text-[16px]
                    md:text-lg 
                    lg:text-xl 
                    font-medium
                    break-all
                    bg-${(todo.isCompleted)?"green":"gray"}-100
                    hover:bg-${(todo.isCompleted)?"green":"gray"}-200
                    hover:border-${(todo.isCompleted)?"green":"violet"}-500
                    text-${(todo.isCompleted)?"green-600":"violet-800"}
                `}
                onClick={()=>setPopup(!popup)}
                >
                    {todo.title}</p>
                <button 
                className={`
                    p-2
                    border-2 
                    border-${(todo.isCompleted)?"green":"red"}-500 
                    hover:bg-${(todo.isCompleted)?"green":"red"}-100
                    rounded 
                    active:bg-violet-100
                    ml-3
                `}
                onClick={(e)=>handleCompleted(e, todo)}
                >
                    <img src={(todo.isCompleted)?checked:check} alt="Star Todo"/>
                </button>
                <button 
                className="p-2 border-2 border-blue-700 rounded mx-2 hover:bg-blue-200"
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto',
                    })
                    document.body.style.overflow = "hidden"
                    setEditTodo(true)
                }}
                >
                    <img src={edit} alt="Edit Todo"/>
                </button>
                <button 
                className="p-2 border-2 border-red-500 rounded active:bg-red-200"
                onClick={()=>{
                    window.scrollTo({
                        top: 0,
                        behavior: 'auto',
                    })
                    document.body.style.overflow = "hidden"
                    setDeleteTodo(true)
                }}
                >
                    <img src={bin} alt="Delete Todo" className="w-6" />
                </button>
            </div>

            <TodoModal popup={popup} todoId={todo._id} makeRequest={makeRequest} created={todo.createdAt} updated={todo.updatedAt}/>

            <EditTodo editTodo={editTodo} setEditTodo={setEditTodo} todo={todo} makeRequest={makeRequest} setMakeRequest={setMakeRequest}/>
            
            <DeleteModal deleteTodo={deleteTodo} setDeleteTodo={setDeleteTodo} todo={todo} setMakeRequest={setMakeRequest} makeRequest={makeRequest}/>
        </>
    )
}

export default Todo