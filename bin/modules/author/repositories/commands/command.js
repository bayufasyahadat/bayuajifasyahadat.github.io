const ObjectId = require('mongodb').ObjectID;
class Command {

  constructor(db) {
    this.db = db;
    this.db.setCollection('author');
  }

  async insertOneAuthor(document){
    const result = await this.db.insertOne({...document, bookId: ObjectId(document.bookId)});
    return result;
  }
  
  async updateOneAuthor(authorId,document){
    const result = await this.db.updateOne({ _id: ObjectId(authorId) }, document);
    return result;
  }

  async deleteOneAuthor(bookId, document){
    const result = await this.db.deleteOne({_id: ObjectId(bookId) }, document);
    return result;
  }
}

module.exports = Command;
