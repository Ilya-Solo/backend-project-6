// @ts-check

import i18next from 'i18next';

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
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      const userId = req.params.id;
      try {
        const user = await app.objection.models.user.query().findById(userId);
        reply.render('users/edit', { user });
      } catch ({data}) {
        req.flash('error', i18next.t('flash.users.edit.error'));
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
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const userId = req.params.id;
        const user = await app.objection.models.user.query().findById(userId);

        if (!user) {
          throw new Error('User not found');
        }

        user.$set(req.body.data);
        await user.$query().patch();
        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect(app.reverse('users'));
      } catch ({data}) {
        req.flash('error', i18next.t('flash.users.edit.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .delete('/users/:id', async (req, reply) => {
      try {
        const userId = req.params.id;
        const deletedUser = await app.objection.models.user.query().deleteById(userId);
        if (deletedUser !== 1) {
          throw Error;
        }
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
      } catch ({data}) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.redirect(app.reverse('users'));
      }

      return reply;
    })
};
