const express = require("express")
const router = express.Router()

const { createTodo, getTodos, editTodo, getTodo, deleteTodo, searchTodos } = require("../controllers/TodoController")

router.route("/create").post(createTodo)

router.route("/getAll").get(getTodos)

router.route("/search").get(searchTodos)

router
    .route("/:userId/:todoId")
    .get(getTodo)
    .put(editTodo)
    .delete(deleteTodo)

module.exports = router