// @ts-check

import i18next from 'i18next';
import { redirectRootIfNotuthenticated } from '../helpers/index.js';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses', preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus', preHandler: redirectRootIfNotuthenticated(app) }, (req, reply) => {
      const status = new app.objection.models.status();
      reply.render('statuses/new', { status });
      return reply;
    })
    .get('/statuses/:id/edit', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const statusId = req.params.id;
      try {
        const status = await app.objection.models.status.query().findById(statusId);
        reply.render('statuses/edit', { status });
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        reply.redirect(app.reverse('statuses'));
      }
      return reply;
    })
    .post('/statuses', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const status = new app.objection.models.status();
      status.$set(req.body.data);

      try {
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: data });
      }

      return reply;
    })
    .patch('/statuses/:id', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const statusId = req.params.id;
      try {
        const status = await app.objection.models.status.query().findById(statusId);
        await app.objection.models.status.fromJson(req.body.data);
        status.$set(req.body.data);
        await status.$query().patch();
        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        reply.render('statuses/edit', { status: { ...req.body.data, id: statusId }, errors: data });
      }

      return reply;
    })
    .delete('/statuses/:id', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      try {
        const statusId = req.params.id;
        const statuses = (await app.objection.models.task.query()
          .where('tasks.statusId', '=', statusId));
        const isStatusUsedInTask = statuses.length !== 0;
        if (!isStatusUsedInTask) {
          await app.objection.models.status.query().deleteById(statusId);
          req.flash('info', i18next.t('flash.statuses.delete.success'));
          reply.redirect(app.reverse('statuses'));
          return reply;
        }

        throw Error('Status is presented in task');
      } catch (error) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      }
    });
};
