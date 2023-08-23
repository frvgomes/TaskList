import jwt from 'jsonwebtoken';
import User from '../models/Users';

import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res
                .status(401)
                .json({ error: 'Usuário ou Senha inválidos.' });
        }

        const auth = await user.checkPassword(password);
        if (!auth) {
            return res
                .status(401)
                .json({ error: 'Usuário ou senha inválidos.' });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}
export default new SessionController();
