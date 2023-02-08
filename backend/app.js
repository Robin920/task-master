require("dotenv").config()


const express = require("express")
const app = express()

const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Homepage"
    })
})

const todoRoutes = require("./routes/TodoRoutes")
const userRoutes = require("./routes/UserRoutes")

app.use("/todo", todoRoutes)
app.use("/user", userRoutes)

module.exports = app