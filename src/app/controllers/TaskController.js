import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
    async index(req, res) {
        const tasks = await Task.findAll({ where: { user_id: req.userId } });
        return res.json(tasks);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            task: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Validação de dados falhou.' });
        }

        const { task } = req.body;

        const tasks = await Task.create({
            user_id: req.userId,
            task,
        });

        return res.json(tasks);
    }

    async update(req, res) {
        const { task_id } = req.params;
        const { check } = req.body;

        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(400).json({ error: 'Task não encontrada' });
        }

        if (!(typeof check === 'boolean')) {
            return res.status(400).json({ error: 'Parâmetro inválido' });
        }

        await task.update({ check });

        return res.json(task);
    }

    async delete(req, res) {
        const { task_id } = req.params;

        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(400).json({ error: 'Task não encontrada' });
        }

        if (task.user_id !== req.userId) {
            return res.status(401).json({ error: 'Exclusão não autorizada.' });
        }

        await task.destroy();

        return res.send();
    }
}
export default new TaskController();
