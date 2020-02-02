const ObjectId = require('mongodb').ObjectID;
class Command {

  constructor(db) {
    this.db = db;
    this.db.setCollection('user');
  }

  async insertOneUser(document){
    const result = await this.db.insertOne(document);
    return result;
  }

  async updateOneUser(userId,document){
    const result = await this.db.updateOne({ _id: ObjectId(userId) }, document);
    return result;
  }
}

module.exports = Command;
