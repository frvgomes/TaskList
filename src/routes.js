import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';

const routes = new Router();

// Rotas não autenticadas
routes.post('/login', SessionController.store);
routes.post('/users', UserController.store);
// Rotas autenticadas
routes.use(auth);
routes.put('/users', UserController.update);

export default routes;
