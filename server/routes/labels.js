// @ts-check

import i18next from 'i18next';
import { redirectRootIfNotuthenticated } from '../helpers/index.js'

export default (app) => {
  app
    .get('/labels', {name: 'labels', preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel', preHandler: redirectRootIfNotuthenticated(app) }, (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
      return reply;
    })
    .get('/labels/:id/edit', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const labelId = req.params.id;
      try {
        const label = await app.objection.models.label.query().findById(labelId);
        reply.render('labels/edit', { label });
      } catch ({data}) {
        req.flash('error', i18next.t('flash.labels.edit.error'));
        reply.redirect(app.reverse('labels'));
      }
      return reply;
    })
    .post('/labels', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({data}) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label, errors: data });
      }

      return reply;
    })
    .patch('/labels/:id', { preHandler: redirectRootIfNotuthenticated(app) },  async (req, reply) => {
      const labelId = req.params.id;
      try {
          const label = await app.objection.models.label.query().findById(labelId);
          await app.objection.models.label.fromJson(req.body.data);
          label.$set(req.body.data);
          await label.$query().patch();
          req.flash('info', i18next.t('flash.labels.edit.success'));
          reply.redirect(app.reverse('labels'));
      } catch ({data}) {
        req.flash('error', i18next.t('flash.labels.edit.error'));
        reply.render('labels/edit', { label: { ...req.body.data, id: labelId}, errors: data });
      }

      return reply;
    })
    .delete('/labels/:id', { preHandler: redirectRootIfNotuthenticated(app) }, async (req, reply) => {
      try {
        const labelId = req.params.id;
        try {
          await app.objection.models.task.query()
            .where('tasks.labelId', '=', labelId);
        } catch {
          const deletedLabel = await app.objection.models.label.query().deleteById(labelId);

          if (deletedLabel !== 1) {
            throw Error;
          }

          req.flash('info', i18next.t('flash.labels.delete.success'));
          reply.redirect(app.reverse('labels'));
          return reply;
        }

        throw Error;
      } catch ({data}) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
        reply.redirect(app.reverse('labels'));
        return reply;
      }
    })
};
