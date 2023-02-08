import { useState, useContext } from "react"

import account from "../config/appwriteConfig"

import userContext from "../context/userContext"

import logo from "../assets/logo.png"

import { Navigate } from "react-router-dom"

import TodoButton from "../components/TodoButton"

const LoginPage = () => {

    const  {user, setUser} = useContext(userContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            await account.createEmailSession(email, password);
            console.log("USER LOGGEDIN SUCCESSFULLY")
            setUser(await account.get())
        } catch(error){
            console.log("Error in handle login appwrite service")
            console.log("Error Message: ", error.message)
        }
    }

    const handleChange = (e, stateUpdate) => {
        stateUpdate(e.target.value)
    }

    if(user){
        return <Navigate replace to="/"/>
    }
    return(
        <div className="
            w-5/6
            md:w-3/4 
            lg:w-2/3
            xl:w-1/3
            h-[86vh] 
            m-auto 
            flex 
            flex-col 
            justify-center 
            items-center
            gap-6
        ">
            <img src={logo} alt="Logo" className="-mt-10 w-5/6 max-w-md" />
            <form 
            style={{color: '#ff3847'}}
            className="border rounded py-4 px-2 bg-orange-700"
            onSubmit={(e)=>handleLogin(e)}>

                <input
                className="
                    w-full
                    rounded
                    border-orange-700
                    text-lg
                    md:text-xl
                    mb-4
                    focus:outline-none
                    focus:ring-0
                    focus:border-orange-800
                    placeholder-blue-500
                " 
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e)=>handleChange(e, setEmail)} />

                <input 
                className="
                    w-full
                    rounded
                    border-orange-700
                    text-lg
                    md:text-xl
                    mb-4
                    focus:outline-none
                    focus:ring-0
                    focus:border-orange-800
                    placeholder-blue-500
                " 
                placeholder="Password"
                type="password"
                name="password"
                id="password" 
                value={password}
                onChange={(e)=>handleChange(e, setPassword)}/>

                <TodoButton name="Login" />

            </form>
        </div>
    )
}

export default LoginPage