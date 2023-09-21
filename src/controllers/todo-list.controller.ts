import { Request, Response } from 'express';
import TodoList from "../models/todo-list.model";
import isEven from "is-even";

interface IToDo {
    text: string;
    completed: boolean;
    date: Date;
}


async function CreateList(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const todoList = await TodoList.findOne(name);
        if (todoList) return res.status(409).json("List already exists")

        const totalRecords = await TodoList.count();

        const newList = new TodoList({
            name,
            isEven: isEven(totalRecords)
        });

        await newList.save()
        res.status(201).json(newList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server Error: ${error}` });
    }
}


async function UpdateList(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const todoList = await TodoList.findById(id);
        if (!todoList) return res.status(404).json("List not found")

        const newTodo: IToDo = {
            text,
            completed: false,
            date: new Date()
        }

        todoList.todos.push(newTodo);
        await todoList.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server Error: ${error}` });
    }
}

async function GetAllLists(req: Request, res: Response) {
    try {
        const todoList = TodoList.find();
        res.status(200).json(todoList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server Error: ${error}` });
    }
}


export default {
    CreateList, UpdateList, GetAllLists
};