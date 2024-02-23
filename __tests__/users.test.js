// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import {
  getTestData, prepareData, stringifyValues,
} from './helpers/index.js';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
    await prepareData(app);
  });

  beforeEach(async () => {
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });

    expect(user).toMatchObject(expected);
  });

  it('patch', async () => {
    const params = testData.users.edit;

    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: testData.users.new,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const user = await models.user.query().findOne({ email: testData.users.new.email });

    const response = await app.inject({
      method: 'PATCH',
      url: `${app.reverse('users')}/${user.id}`,
      payload: {
        data: testData.users.edit,
      },
      cookies: cookie,
    });

    const edittedUser = await models.user.query().findById(user.id);

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };

    expect(edittedUser).toMatchObject(expected);

    await app.inject({
      method: 'DELETE',
      url: app.reverse('session'),
      cookies: cookie,
    });
  });

  it('delete while presented in task', async () => {
    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: testData.users.edit,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const user = await models.user.query().findOne({ email: testData.users.edit.email });

    const taskObj = testData.taskToCheckEntitiesDelete;
    taskObj.executorId = user.id;
    await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: {
        data: stringifyValues(taskObj),
      },
      cookies: cookie,
    });

    const response = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('users')}/${user.id}`,
      cookies: cookie,
    });

    const deletedUser = await models.user.query().findById(user.id);

    expect(response.statusCode).toBe(302);

    expect(deletedUser).toMatchObject(user);

    const task = await models.task.query().findOne({ name: taskObj.name });
    await app.inject({
      method: 'DELETE',
      url: `${app.reverse('tasks')}/${task.id}`,
      cookies: cookie,
    });
  });

  it('delete', async () => {
    const responseSignIn = await app.inject({
      method: 'POST',
      url: app.reverse('session'),
      payload: {
        data: testData.users.edit,
      },
    });

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const user = await models.user.query().findOne({ email: testData.users.edit.email });

    const response = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('users')}/${user.id}`,
      cookies: cookie,
    });

    const deletedUser = await models.user.query().findById(user.id);

    expect(response.statusCode).toBe(302);

    expect(deletedUser).toBeFalsy();
  });

  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции
    // await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
