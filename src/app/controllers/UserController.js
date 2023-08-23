import * as Yup from 'yup';
import User from '../models/Users';

class UserController {
    async store(req, res) {
        // Validação Yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Validação de dados falhou.' });
        }
        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExist) {
            return res.status(400).json({ error: 'E-mail já existe.' });
        }
        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        // Validação Yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Validação de dados falhou.' });
        }

        const { name, email } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const emailExist = await User.findOne({ where: { email } });
            if (emailExist) {
                return res
                    .status(400)
                    .json({ error: 'E-mail já está em uso.' });
            }
        }

        const { id } = await user.update({ name, email });

        return res.json({ id, name, email });
    }
}

export default new UserController();
