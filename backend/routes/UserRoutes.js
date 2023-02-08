const express = require("express")
 const router = express.Router()
 

 const { createUser } = require("../controllers/user/CreateUser")
 const { getUserTodos } = require("../controllers/user/getUserTodos")

 router.route("/create").post(createUser)


 router.route("/todos").get(getUserTodos)

 module.exports = router