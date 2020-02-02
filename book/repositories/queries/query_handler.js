
const Book = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const book = new Book(db);

const getBook = async (bookId) => {
  const getData = async () => {
    const result = await book.viewBook(bookId);
    return result;
  };
  const result = await getData();
  return result;
};

const getAllBook = async () => {
  const getData = async () => {
    const result = await book.viewAllBook();
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getBook,
  getAllBook
};
