
const Author = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const author = new Author(db);

const getAuthor = async (authorId) => {
  const getData = async () => {
    const result = await author.viewAuthor(authorId);
    return result;
  };
  const result = await getData();
  return result;
};

const getAllAuthor = async () => {
  const getData = async () => {
    const result = await author.viewAllAuthor();
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getAuthor,
  getAllAuthor
};
