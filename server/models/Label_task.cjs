// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ 
  fields: ['labelId', 'taskId'],
  composite: ['labelId', 'taskId'],
});

module.exports = class LabelTask extends unique(BaseModel) {
  static get tableName() {
    return 'labels_tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['labelId', 'taskId'],
      properties: {
        labelId: { type: 'integer' },
        taskId: { type: 'integer' },
      },
    };
  }
}
