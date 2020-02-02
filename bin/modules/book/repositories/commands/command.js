const ObjectId = require('mongodb').ObjectID;
class Command {

  constructor(db) {
    this.db = db;
    this.db.setCollection('book');
  }

  async insertOneUser(document){
    const result = await this.db.insertOne(document);
    return result;
  }

  async insertOneBook(document){
    const result = await this.db.insertOne(document);
    return result;
  }

  async updateOneBook(bookId, document){
    const result = await this.db.updateOne({ _id: ObjectId(bookId) }, document);
    return result;
  }

  async deleteOneBook(bookId, document){
    const result = await this.db.deleteOne({_id: ObjectId(bookId) }, document);
    return result;
  }
}

module.exports = Command;
