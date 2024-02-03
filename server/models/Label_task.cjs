// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['tagId', 'taskId'] });

module.exports = class LabelTask extends unique(BaseModel) {
  static get tableName() {
    return 'labels_tasks';
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
