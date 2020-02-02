
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class Author {

  constructor(db){
    this.query = new Query(db);
  }

  async viewAuthor(authorId) {
    const author = await this.query.findById(authorId);
    if (author.err) {
      return wrapper.error(new NotFoundError('Can not find author'));
    }
    const { data } = author;
    return wrapper.data(data);
  }

  async viewAllAuthor() {
    const author = await this.query.findAll();
    if (author.err) {
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = author;
    return wrapper.data(data);
  }

}

module.exports = Author;
