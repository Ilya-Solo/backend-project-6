// @ts-check

import i18next from 'i18next';
import _ from 'lodash';

export default (app) => ({
  route(name) {
    return app.reverse(name);
  },
  t(key) {
    return i18next.t(key);
  },
  _,
  getAlertClass(type) {
    switch (type) {
      // case 'failure':
      //   return 'danger';
      case 'error':
        return 'danger';
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      default:
        throw new Error(`Unknown flash type: '${type}'`);
    }
  },
  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  },
});

export const redirectRootIfNotuthenticated = (app) => (req, reply, next)=> {
  if (!req.isAuthenticated()) {
    req.flash('error', i18next.t('flash.users.edit.error.noAuth'));
    return reply.redirect(app.reverse('root'));
  }
  next();
}

export const isAuthoriedUser = (sessionUser, requiredUserId) => {
  return (sessionUser.id === requiredUserId);
}
