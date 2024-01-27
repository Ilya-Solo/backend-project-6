// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');
const encrypt = require('../lib/secure.cjs');
const User = require('./User.cjs');
const Status = require('./Status.cjs');

const unique = objectionUnique({ fields: ['email'] });

module.exports = class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        statusId: { type: 'integer' },
        creatorId: { type: 'integer' },
        executorId: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
        status: {
          relation: BaseModel.BelongsToOneRelation,
          modelClass: Status,
          join: {
            from: 'tasks.statusId',
            to: 'statuses.id',
          },
        },
        creator: {
          relation: BaseModel.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'tasks.creatorId',
            to: 'users.id',
          },
        },
        executor: {
          relation: BaseModel.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'tasks.executorId',
            to: 'users.id',
          },
        },
    };
  }
}