import { Router } from 'express';
const {verifyJwtToken} = require("../config/jwtHelper")
import { createTodos, getAllTodos, getTodos, deleteTodos, updateTodos } from '../controller/todos.controller';
import { userLogin, createUser } from "../controller/user.controller"


const router = Router();

router.post('/todos/',verifyJwtToken, createTodos);

router.get('/todos/',verifyJwtToken, getAllTodos);

router.get('/todos/:id',verifyJwtToken, getTodos);

router.patch('/todos/:id',verifyJwtToken, updateTodos);

router.delete('/todos/:id',verifyJwtToken, deleteTodos);

router.post("/user/login", userLogin);

router.post("/user/", createUser);

export default router;