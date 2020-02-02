
const Book = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const book = new Book(db);

// const postDataLogin = async (payload) => {
//   const postCommand = async payload => user.generateCredential(payload);
//   return postCommand(payload);
// };

// const registerUser = async (payload) => {
//   const postCommand = async payload => user.register(payload);
//   return postCommand(payload);
// };

const insertBook = async (payload) => {
  const postCommand = async payload => book.insert(payload);
  return postCommand(payload);
};

const updateBook = async(bookId, payload) => {
  const postCommand = async payload => book.update(bookId, payload);
  return postCommand(payload);
};

const deleteBook = async(bookId, payload) => {
  const postCommand = async payload => book.del(bookId, payload);
  return postCommand(payload);
};

module.exports = {
  // postDataLogin,
  // registerUser,
  insertBook,
  updateBook,
  deleteBook,
};
