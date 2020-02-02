
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class Book {

  constructor(db){
    this.query = new Query(db);
  }

  async viewBook(bookId) {
    const book = await this.query.findById(bookId);
    if (book.err) {
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = book;
    return wrapper.data(data);
  }

  async viewAllBook() {
    const book = await this.query.findAll();
    if (book.err) {
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = book;
    return wrapper.data(data);
  }

}

module.exports = Book;
