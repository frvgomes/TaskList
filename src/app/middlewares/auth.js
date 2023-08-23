import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import auth from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não encontrado.' });
    }
    const [, token] = authHeader.split(' ');

    try {
        const decoder = await promisify(jwt.verify)(token, auth.secret);

        req.userId = decoder.id;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
};
