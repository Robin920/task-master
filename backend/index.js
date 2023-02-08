const app = require("./app")

const { dbConnect } = require("./config/dbConnect")
dbConnect()

const { PORT } = process.env

app.listen(PORT||4001, ()=>{
    console.log("Server is up and running in PORT", PORT||4001)
})