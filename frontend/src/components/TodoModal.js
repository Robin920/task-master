import { useContext, useEffect, useState } from "react"

import axios from "axios"

import userContext from "../context/userContext"

const TodoModal = ({popup, todoId, makeRequest, created, updated}) => {

    const {user} = useContext(userContext)

    const [tasks, setTasks] = useState({})

    const getTodoTasks = async () => {
        try {
            const response = await axios.get(`/todo/${user.$id}/${todoId}`)
            if(response.data.todo.tasks)
            setTasks(response.data.todo.tasks)
        } catch (error) {
            console.log("Error in fetching tasks in Todo modal");
            console.log("Error: ", error);
        }
    }

    
    useEffect(()=>{ 
        getTodoTasks()
    }, [makeRequest])

    if(!popup) return ""
    return(
        <div
        className="
            w-[95%]
            border-2 
            hover:border-blue-400 
            p-2 
            rounded
            text-sm
            sm:text-md
            md:text-lg
            xl:text-xl 
            text-blue-800 
            font-medium
            m-auto
            max-h-24
            md:max-h-44
            overflow-auto
            my-4  
        ">
            <div>
                {
                    (tasks.length===0)?
                    <p>No Tasks Available</p>
                    :
                    tasks.map((task, index)=>(
                        (task)?
                        <p className="inline-block m-1 border-2 border-blue-800 rounded p-1" key={index}>{task}</p>
                        :
                        ""
                    ))
                }
            </div>
            <div className="flex justify-between text-base mt-4">
                <p>Created: {new Date(created).toLocaleString("en-GB", {timeZone: 'Asia/Kolkata'})}</p>
                <p>Updated: {new Date(updated).toLocaleString("en-GB", {timeZone: 'Asia/Kolkata'})}</p>
                
            </div>
        </div>
    )
}

export default TodoModal