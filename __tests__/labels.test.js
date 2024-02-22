// @ts-check

import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import { getTestData, prepareData, getUserCookie, stringifyValues } from './helpers/index.js';

describe('test labels CRUD', () => {
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
      url: app.reverse('labels'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newLabel'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('no login create', async () => {
    const params = testData.labels.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {...params};
    const label = await models.label.query().findOne({ name: params.name });

    expect(label).toBeFalsy();
  });

  it('create', async () => {
    const params = testData.labels.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);
    const expected = {...params};
    const label = await models.label.query().findOne({ name: params.name });

    expect(label).toMatchObject(expected);
  });

  it('no login patch', async () => {
    const params = testData.labels.edit;

    const label = await models.label.query().findOne({ name: testData.labels.new.name });
    
    const response = await app.inject({
      method: 'PATCH',
      url: `${app.reverse('labels')}/${label.id}`,
      payload: {
        data: testData.labels.edit,
      },
    });

    const edittedLabel = await models.label.query().findById(label.id);

    expect(response.statusCode).toBe(302);
    const expected = {...testData.labels.new};
    

    expect(edittedLabel).toMatchObject(expected);
  });

  it('patch', async () => {
    const params = testData.labels.edit;

    const label = await models.label.query().findOne({ name: testData.labels.new.name });
    
    const response = await app.inject({
      method: 'PATCH',
      url: `${app.reverse('labels')}/${label.id}`,
      payload: {
        data: testData.labels.edit,
      },
      cookies,
    });

    const edittedLabel = await models.label.query().findById(label.id);

    expect(response.statusCode).toBe(302);
    const expected = {...params};
    

    expect(edittedLabel).toMatchObject(expected);
  });

  it('no login delete', async () => {
    const params = testData.labels.edit;

    const label = await models.label.query().findOne({ name: testData.labels.edit.name });
    
    const response = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('labels')}/${label.id}`,
    });

    const deletedLabel = await models.label.query().findById(label.id);

    expect(response.statusCode).toBe(302);
    

    expect(deletedLabel).toMatchObject(label);
  });

  it('delete while presented in task', async () => {
    const params = testData.labels.edit;

    const label = await models.label.query().findOne({ name: params.name });
    
    const task = testData.taskToCheckEntitiesDelete;
    task["labels"] = [label.id]

    const responseTaskCreate = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: {
        data: stringifyValues(task),
      },
      cookies,
    });

    // const aaa = await models.task.query().findOne({ name: task.name });
    
    const response = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('labels')}/${label.id}`,
      cookies,
    });

    const deletedLabel = await models.label.query().findById(label.id);

    expect(response.statusCode).toBe(302);

    expect(deletedLabel).toMatchObject(label);

    const taskToDelete = await models.task.query().findOne({ name: task.name }); 
    const responseDeleteTask = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('tasks')}/${taskToDelete.id}`,
      cookies,
    });
  });

  it('delete', async () => {
    const params = testData.labels.edit;

    const label = await models.label.query().findOne({ name: testData.labels.edit.name });
    
    const response = await app.inject({
      method: 'DELETE',
      url: `${app.reverse('labels')}/${label.id}`,
      cookies,
    });

    const deletedLabel = await models.label.query().findById(label.id);

    expect(response.statusCode).toBe(302);
    

    expect(deletedLabel).toBeFalsy();
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
