// @ts-check

import i18next from 'i18next';
import { isAuthoriedUser } from '../helpers/index.js'

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
      return reply;
    })
    .get('/users/:id/edit', async (req, reply) => {
      const userId = req.params.id;
      try {
        const user = await app.objection.models.user.query().findById(userId);
        const sessionUserData = req.user;
        if (!req.isAuthenticated()) {
          req.flash('error', i18next.t('flash.users.edit.error.noAuth'));
          reply.redirect(app.reverse('users'));
        } else if (!isAuthoriedUser(sessionUserData, user.id)) {
          req.flash('error', i18next.t('flash.users.edit.error.wrongAuth'));
          reply.redirect(app.reverse('users'));
        } else {
          reply.render('users/edit', { user });
        }
      } catch ({data}) {
        req.flash('error', i18next.t('flash.users.edit.error.wrongAuth'));
        reply.redirect(app.reverse('users'));
      }
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({data}) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .patch('/users/:id', async (req, reply) => {
      const userId = req.params.id;
      try {
          const user = await app.objection.models.user.query().findById(userId);
          const sessionUserData = req.user;
          if (!req.isAuthenticated()) {
            req.flash('error', i18next.t('flash.users.edit.error.noAuth'));
            reply.redirect(app.reverse('users'));
          } else if (!isAuthoriedUser(sessionUserData, user.id)) {
            req.flash('error', i18next.t('flash.users.edit.error.wrongAuth'));
            reply.redirect(app.reverse('users'));
          } else {
            await app.objection.models.user.fromJson(req.body.data);
            user.$set(req.body.data);
            await user.$query().patch();
            req.flash('info', i18next.t('flash.users.edit.success'));
            reply.redirect(app.reverse('users'));
          }
      } catch ({data}) {
        req.flash('error', i18next.t('flash.users.edit.error.edit'));
        reply.render('users/edit', { user: { ...req.body.data, id: userId}, errors: data });
      }

      return reply;
    })
    .delete('/users/:id', async (req, reply) => {
      try {
        const userId = req.params.id;
        const user = await app.objection.models.user.query().findById(userId);
        const sessionUserData = req.user;
        if (!req.isAuthenticated()) {
          req.flash('error', i18next.t('flash.users.edit.error.noAuth'));
          reply.redirect(app.reverse('users'));
        } else if (!isAuthoriedUser(sessionUserData, user.id)) {
          req.flash('error', i18next.t('flash.users.edit.error.wrongAuth'));
          reply.redirect(app.reverse('users'));
        } else {
          const statusId = req.params.id;
          try {
            await app.objection.models.task.query()
              .where('tasks.executorId', '=', userId)
              .orWhere('tasks.creatorId','=', userId);
          } catch {
            const deletedUser = await app.objection.models.user.query().deleteById(userId);

            if (deletedUser !== 1) {
              throw Error;
            }
            req.logOut();
            req.flash('info', i18next.t('flash.users.delete.success'));
            reply.redirect(app.reverse('users'));
            return reply;
          }
          throw Error('User can\'t be deleted');
        }
      } catch (error) {
        if (error.message = 'User can\'t be deleted') {
          req.flash('error', i18next.t('flash.users.delete.error.default'));
        } else {
          req.flash('error', i18next.t('flash.users.delete.error.auth'));
        }
        reply.redirect(app.reverse('users'));
        return reply;
      }
    })
};
