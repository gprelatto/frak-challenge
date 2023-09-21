
import express from 'express';
import TodoListController from '../controllers/todo-list.controller';

export const todoListRoute = express.Router();

todoListRoute.get('/', TodoListController.GetAllLists);
todoListRoute.post('/', TodoListController.CreateList);
todoListRoute.put('/:id/to-do/add', TodoListController.UpdateList);

