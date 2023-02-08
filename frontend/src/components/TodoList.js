import { useState, useEffect, useContext } from "react"

import axios from "axios"

import userContext from "../context/userContext"

import searchIcon from "../assets/icons/search.png"
import closeIcon from "../assets/icons/close.png"

import Todo from "./Todo"

const TodoList = ({makeRequest, setMakeRequest}) => {

    const {user} = useContext(userContext)

    const [todos, setTodos] = useState([])

    const [search, setSearch] = useState("")

    const [closeSearch, setCloseSearch] = useState(false)


     const getTodos = async () => {
        try{
            const response = await axios.get("/user/todos", {params:{userId: user.$id}})
            const {data} = response
            data.user.todos.sort((a,b)=>b.isImportant - a.isImportant)
            setTodos([...data.user.todos])
        }catch(error){
            console.log("Error while fetching todos in getTodos method")
            console.log("Error: ", error)
        }     
    }

    const handleSearch = async (e) => {
        try{
            e.preventDefault()
            setSearch(search.trim())
            if(!search) return
            const response = await axios.get("http://localhost:3000/todo/search", {params:{search ,userId: user.$id}})
            const {data} = response
            data.todos.sort((a,b)=>b.isImportant - a.isImportant)
            setTodos([...data.todos])
            setCloseSearch(true)
        }catch(error){
            console.log("Error while fetching search todos in getTodos method")
            console.log("Error: ", error)
        }     
    }

    const handleSort = (sort) => {
        const sortTodos = todos
        if(sort !== "isImportant" && sort !=="updatedAt" && sort !=="isCompleted"){
            sortTodos.sort((a,b)=>{
                if(a[sort]>b[sort]) return 1
                if(a[sort]<b[sort]) return -1
                return 0
            })
        } else {
            sortTodos.sort((a,b)=>{
                if(a[sort]>b[sort]) return -1
                if(a[sort]<b[sort]) return 1
                return 0
            })
        }
        setTodos([...sortTodos])
    }

    useEffect(()=>{
        getTodos()
        setCloseSearch(false)
    }, [makeRequest])

    return(
        <>
            <div 
            className="
                flex 
                flex-wrap
                items-center 
                justify-between 
                my-4 
                w-full
                sm:w-2/3 
                m-auto 
            ">
                {
                    (closeSearch)?
                    <button
                    className="border border-red-700 rounded p-2 ml-6 sm:ml-3 md:p-3 my-4 lg:my-0"
                    type="button"
                    onClick={(e)=>{
                        setCloseSearch(false)
                        setSearch("")
                        getTodos()
                    }}
                    >
                        <img src={closeIcon} alt="cancel search" width="20"/>
                    </button>
                    :
                    <div></div>
                }
                <div className="order-2 ml-6 sm:ml-2 my-4 lg:order-none md:ml-0">
                    <label htmlFor="sort">
                        <span className="font-medium text-blue-800">Sort by: </span>
                        <select defaultValue="isImportant" 
                        onChange={(event)=>{
                            handleSort(event.target.value)

                        }}
                        className="border-blue-500 rounded text-blue-800 font-semibold py-0.5"
                        >
                            <option value="isImportant" className="px-2">Priority</option>
                            <option value="isCompleted" className="px-2">Completed</option>
                            <option value="createdAt" className="px-2">Created Date</option>
                            <option value="updatedAt" className="px-2">Updated Date</option>
                            <option value="title" className="px-2">Alphabetical</option>
                        </select>
                    </label>
                </div>
                <div 
                className="
                    flex 
                    items-center 
                    w-full
                    mx-5
                    sm:mx-2
                    lg:mx-3
                    lg:w-7/12
                    lg:mx-0
                    xl:w-5/12
                ">
                    <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter") handleSearch(e)
                    }}
                    required
                    placeholder="Search for your todos / tasks"
                    className="
                        w-full 
                        border-r-transparent 
                        border-blue-500 
                        rounded-l
                        text-sm 
                        lg:text-lg 
                        placeholder-blue-500 
                        leading-4
                        lg:leading-7 
                        py-2 
                        text-blue-800 
                        font-medium 
                        outline-none 
                        focus:ring-0
                    "
                    />
                    <button
                    className="
                        border 
                        border-blue-500 
                        rounded-r
                        p-[5.3px]
                        lg:p-3
                    "
                    type="button"
                    onClick={(e)=>handleSearch(e)}
                    >
                        <img src={searchIcon} alt="search button" />
                    </button>
                </div>
            </div>
            <div className="border-2 w-[95%] sm:w-2/3 mx-auto mb-12 pr-2 pb-1 rounded">
                {
                    (todos.length === 0)?
                        (!closeSearch)?
                        <p className="text-2xl font-semibold text-blue-800 text-center p-2">Your have no todos left...!</p>
                        :
                        <p className="text-sm md:text-2xl font-semibold text-blue-800 text-center p-2">No todos or tasks available with respect to your search</p>
                    :
                    todos.map((todo)=>(
                        <Todo todo={todo} key={todo._id} makeRequest={makeRequest} setMakeRequest={setMakeRequest}/>
                    ))
                }
            </div>
        </>
    )
}

export default TodoList