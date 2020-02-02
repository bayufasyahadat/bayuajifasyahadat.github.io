const wrapper = require('../../../../helpers/utils/wrapper');
const ObjectId = require('mongodb').ObjectId;

class Query {

  constructor(db) {
    this.db = db;
    this.db.setCollection('book');
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

  async findAll() {
    const ctx = 'mongodb-findAllBook';
    const db = await this.db.customQuery(ctx);
    try {
      const recordset = await db.aggregate([
        { $lookup:
          {
            from: 'author',
            localField: 'authorId',
            foreignField: '_id',
            as: 'author'
          }
        },
        { $unwind: '$author' }
      ]).toArray();
      return wrapper.data(recordset);
    } catch (err) {
      return wrapper.error(`Error findAll Mongo ${err.message}`);
    }
  }

}

module.exports = Query;
