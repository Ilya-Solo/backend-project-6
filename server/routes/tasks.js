// @ts-check

import i18next from 'i18next';
import { redirectRootIfNotuthenticated } from '../helpers/index.js'
import _ from 'lodash';

const normalizeTaskFormData = (req, res, next) => {
  Object.keys(req.body.data).filter((key) => key.includes('Id'))
    .forEach((key) => {
      if (_.isEmpty(req.body.data[key])) {
        delete req.body.data[key];
      } else {
        req.body.data[key] = Number(req.body.data[key]);
      }
    });
  next();
}

export default (app) => {
  app
    .get('/tasks', {name: 'tasks', preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const tasks = await app.objection.models.task.query()
        .join('users as executor', 'tasks.executorId', 'executor.id')
        .join('users as creator', 'tasks.creatorId', 'creator.id')
        .join('statuses', 'tasks.statusId', 'statuses.id')
        .select('tasks.*', 'statuses.name as statusName', 'executor.firstName as executorName', 'creator.firstName as creatorName');
      console.log(tasks)
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      const statuses = await app.objection.models.status.query();
      reply.render('tasks/new', { statuses, users });
      return reply;
    })
    .get('/tasks/:id/edit', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const taskId = req.params.id;
      try {
        const task = await app.objection.models.task.query().findById(taskId);
        reply.render('tasks/edit', { task });
      } catch ({data}) {
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.redirect(app.reverse('tasks'));
      }
      return reply;
    })
    .post('/tasks', { preHandler: [redirectRootIfNotuthenticated(app), normalizeTaskFormData] }, async (req, reply) => {
      const task = new app.objection.models.task();
      const taskData = {...req.body.data, creatorId: req.user.id}
      task.$set(taskData);

      try {
        const validTask = await app.objection.models.task.fromJson(taskData);
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', { task, errors: data });
      }

      return reply;
    })
    .patch('/tasks/:id', { preHandler: redirectRootIfNotuthenticated(app) },  async (req, reply) => {
      const taskId = req.params.id;
      try {
          const task = await app.objection.models.task.query().findById(taskId);
          await app.objection.models.task.fromJson(req.body.data);
          task.$set(req.body.data);
          await task.$query().patch();
          req.flash('info', i18next.t('flash.tasks.edit.success'));
          reply.redirect(app.reverse('tasks'));
      } catch ({data}) {
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.render('tasks/edit', { task: { ...req.body.data, id: taskId}, errors: data });
      }

      return reply;
    })
    .delete('/tasks/:id', async (req, reply) => {
      try {
        const taskId = req.params.id;
        const deletedTask = await app.objection.models.task.query().deleteById(taskId);

        if (deletedTask !== 1) {
          throw Error;
        }

        req.flash('info', i18next.t('flash.tasks.delete.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({data}) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }

      return reply;
    })
};