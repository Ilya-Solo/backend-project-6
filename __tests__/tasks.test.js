// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import {
  getTestData, prepareData, getUserCookie, stringifyValues,
} from './helpers/index.js';

describe('test tasks CRUD', () => {
  let app;
  let knex;
  let models;
  let cookies;
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

    cookies = await getUserCookie(app, testData.users.new);
  });

  beforeEach(async () => {
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.tasks.newFilledTask;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: {
        data: stringifyValues(params),
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const expected = { ...params };
    const task = await models.task.query().findOne({ name: params.name });
    const labelTasks = await models.labelTask.query().where('task_id', task.id);
    const labelIds = labelTasks.map((labelTask) => labelTask.labelId);
    task.labels = labelIds;

    expect(task).toMatchObject(expected);
  });

  it('create with empty non required fields', async () => {
    const params = testData.tasks.newNoExecutorAndLabelsTask;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: {
        data: stringifyValues(params),
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const expected = { ...params };
    const task = await models.task.query().findOne({ name: params.name });
    const labelTasks = await models.labelTask.query().where('task_id', task.id);
    const labelIds = labelTasks.map((labelTask) => labelTask.labelId);
    task.labels = labelIds;

    expect(task).toMatchObject(expected);
  });

  it('patch', async () => {
    const params = testData.tasks.editFilledTask;
    const task = await models.task.query().findOne({ name: testData.tasks.newFilledTask.name });

    const response = await app.inject({
      method: 'PATCH',
      url: `${app.reverse('tasks')}/${task.id}`,
      payload: {
        data: stringifyValues(params),
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const expected = { ...params };
    const edittedTask = await models.task.query().findOne({ name: params.name });
    const labelTasks = await models.labelTask.query().where('task_id', task.id);
    const labelIds = labelTasks.map((labelTask) => labelTask.labelId);
    edittedTask.labels = labelIds;

    expect(edittedTask).toMatchObject(expected);
  });

  it('delete with wrong auth', async () => {
    const task = await models.task.query().findOne({ name: testData.tasks.editFilledTask.name });
    const wrongCookies = await getUserCookie(app, testData.users.edit);
    const response = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('tasks')}/${task.id}`,
      cookies: wrongCookies,
    });

    const deletedTask = await models.task.query().findById(task.id);
    const labelTasks = await models.labelTask.query().where('task_id', task.id);

    expect(response.statusCode).toBe(302);

    expect(deletedTask).toBeTruthy();
    expect(labelTasks.length).toBeGreaterThan(0);
  });

  it('delete', async () => {
    const task = await models.task.query().findOne({ name: testData.tasks.editFilledTask.name });

    const response = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('tasks')}/${task.id}`,
      cookies,
    });

    const deletedTask = await models.task.query().findById(task.id);
    const labelTasks = await models.labelTask.query().where('task_id', task.id);

    expect(response.statusCode).toBe(302);

    expect(deletedTask).toBeFalsy();
    expect(labelTasks).toHaveLength(0);
  });

  afterEach(async () => {
  });

  afterAll(async () => {
    await app.close();
  });
});
