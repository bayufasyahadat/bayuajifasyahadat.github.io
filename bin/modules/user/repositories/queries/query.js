
const ObjectId = require('mongodb').ObjectId;

class Query {

  constructor(db) {
    this.db = db;
    this.db.setCollection('user');
  }

  async findOneUser(parameter) {
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findById(id) {
    const parameter = {
      _id: ObjectId(id)
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

}

module.exports = Query;
