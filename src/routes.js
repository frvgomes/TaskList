import { Router } from 'express';
import User from './app/models/Users';

const routes = new Router();

routes.get('/teste', async (req, res) => {
    const user = await User.create({
        name: 'Admin',
        email: 'admin@teste.com.br',
        password_hash: '123456',
    });

    return res.json(user);
});

export default routes;
