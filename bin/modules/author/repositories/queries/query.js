
const ObjectId = require('mongodb').ObjectId;
const wrapper = require('../../../../helpers/utils/wrapper');

class Query {

  constructor(db) {
    this.db = db;
    this.db.setCollection('author');
  }

  async findOne(parameter) {
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findById(id) {
    const ctx = 'mongodb-findAllAuthor';
    const parameter = ObjectId(id);
    console.log(parameter);
    const recordset = await this.db.customQuery(ctx);
    try {
      const author = await recordset.aggregate([
        { $lookup:
          {
            'from': 'book',
            'localField': '_id',
            'foreignField': 'authorId',
            'as': 'book'
          }
        },
        {$match: {'_id': parameter}}
      ]).toArray();
      return wrapper.data(author);
    } catch (err) {
      return wrapper.error(`Error findAll Mongo ${err.message}`);
    }
  }

  async findAll() {
    const ctx = 'mongodb-findAllAuthor';
    const db = await this.db.customQuery(ctx);
    try {
      const agregat= await db.aggregate([
        { $lookup: {
            'from': 'book', 
            'localField': '_id', 
            'foreignField': 'authorId', 
            'as': 'buku'
          }
        }
      ]).toArray();
      return wrapper.data(agregat);
    } catch (err) {
      return wrapper.error(`Error findAll Mongo ${err.message}`);
    }
    
  }

}

module.exports = Query;
