import { useContext, useState } from "react"

import account from "../config/appwriteConfig"
import { ID } from "appwrite"

import axios from "axios"

import logo from "../assets/logo.png"

import userContext from "../context/userContext"

import  { Navigate } from "react-router-dom"

import TodoButton from "../components/TodoButton"


const SignupPage = () => {


    const {user, setUser} = useContext(userContext)


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profession, setProfession] = useState("")


    const handleSignup = async (e) => {
        e.preventDefault()
        try{
            const appwriteUser = await account.create(
                ID.unique(),
                email,
                password,
                name 
            )
            console.log("USER CREATED SUCCESSFULLY IN APPWRITE")
            await axios.post("/user/create",
                {
                    name: appwriteUser.name,
                    email: appwriteUser.email,
                    appwriteId: appwriteUser.$id,
                    profession
                }
            )
            console.log("USER CREATED SUCCESSFULLY IN DB")
            await account.createEmailSession(email, password)
            console.log("USER LOGGEDIN SUCCESSFULLY")
            setUser(await account.get())
        } catch(error){
            console.log("Error in handle signup appwrite service")
            console.log("Error Message: ", error.message)
        }
    }


     const handleChange = (e, stateUpdate) => {
        stateUpdate(e.target.value)
    }

    if(user) return <Navigate replace to="/"/>

    return(
        <div className="
            h-[90vh]
            flex
            flex-col
            justify-center
            items-center  
            gap-6
            -mt-8
            lg:flex-row
            lg:justify-around
        ">
            <div className="w-3/5 lg:w-2/5 mx-auto">
                <img 
                src={logo} 
                alt="Logo" 
                className="w-full mx-auto max-w-lg" />
            </div>
            <div className="w-5/6 md:w-2/3 lg:w-2/5 mx-auto">
                <form 
                className="border border-orange-700 rounded py-4 px-2 bg-orange-700"
                onSubmit={(e)=>handleSignup(e)}>

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
                    placeholder="Name"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e)=>handleChange(e, setName)} />

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
                    onChange={(e)=>handleChange(e, setPassword)} />

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
                    placeholder="Profession"
                    type="text"
                    name="profession"
                    id="profession" 
                    value={profession}
                    onChange={(e)=>handleChange(e, setProfession)}/>

                    
                        <TodoButton name="Signup"/>
                    
                    
                </form>
            </div>
        </div>
    )
}

export default SignupPage