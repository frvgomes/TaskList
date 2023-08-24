import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

// Rotas não autenticadas
routes.post('/login', SessionController.store);
routes.post('/users', UserController.store);
// Rotas autenticadas
routes.use(auth);
routes.put('/users', UserController.update);
routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);

export default routes;
