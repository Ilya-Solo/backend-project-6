// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['tagId', 'taskId'] });

module.exports = class TagTask extends unique(BaseModel) {
  static get tableName() {
    return 'tags_tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['tagId', 'taskId'],
      properties: {
        tagId: { type: 'integer' },
        taskId: { type: 'integer' },
      },
    };
  }
}
