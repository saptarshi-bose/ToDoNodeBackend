import { RequestHandler, response } from 'express';
import Todo, { TodoMap } from '../models/todos';
import database from '../config/db';

export const createTodos:RequestHandler = async(req, res, next) => {
    try{
        let newTodo = req.body as Todo
        if(typeof newTodo.todoText != undefined && newTodo.todoText){
            TodoMap(database);
            newTodo.userId = req.body.jwtPayload.id;
            const result = await Todo.create(newTodo as any);
            newTodo = result.dataValues as Todo;
            return res.status(201).json({ message: 'Todo created successfully',id: newTodo.id });
        }else return res.status(400).json({error: "Invalid Date Received"});
    }catch(err){
        console.log("Unable to create todo Item", err);
        return res.status(400).json({error: "Unable to create todo Item"});
    }
};

export const getAllTodos:RequestHandler = async(req, res, next) => {
    try{
        TodoMap(database);
        const result = await Todo.findAll({
            where:{
                userId: req.body.jwtPayload.id
            }
        });
        return res.status(200).json(result);
    }catch(err){
        console.log("Unable to fetch All Todo Item", err);
        return res.status(400).json({error: "Unable to fetch All Todo Item"});
    }
};
export const getTodos:RequestHandler<{id: Number}> = async(req, res, next) => {
    try{
        if(req.params.id == null || req.params.id == undefined) return res.status(400).json({error: "Invalid Todo Item Id received!"});
        const todoId = req.params.id;
        TodoMap(database);
        const result = await Todo.findOne({
            where: {
            id: todoId
            }
        });
        res.status(200).json(result);
    }catch(err){
        console.log("Unable to fetch Todo Item", err);
        return res.status(400).json({error: "Unable to fetch Todo Item"});
    }
};

export const updateTodos: RequestHandler<{id: string}> = async(req, res, next) => {
    try{
        if(req.params.id == null || req.params.id == undefined) return res.status(400).json({error: "Invalid Todo Item Id received!"});
        const todoId = req.params.id;
        const updateTodo = req.body as Todo;
        TodoMap(database);
        await Todo.update({todoText: updateTodo.todoText},{
            where:{
                id: todoId
            }
        });
        return res.status(200).json({message:"Updated Successfully!"});
    }catch(err){
        console.log("Unable to delete Todo Item", err);
        return res.status(400).json({error: "Unable to delete Todo Item"});
    }
};

export const deleteTodos: RequestHandler<{id: string}> = async(req, res, next) => {
    try{
        if(req.params.id == null || req.params.id == undefined) return res.status(400).json({error: "Invalid Todo Item Id received!"});
        const todoId = req.params.id;
        TodoMap(database);
        const result = await Todo.destroy({
            where: {
            id: todoId
            }
        });
        res.status(201).json({message: `Todo Item with Id: ${todoId} deleted successfully`})
    }catch(err){
        console.log("Unable to delete Todo Item", err);
        return res.status(400).json({error: "Unable to delete Todo Item"});
    }
}