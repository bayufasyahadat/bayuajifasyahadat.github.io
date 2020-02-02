
const Author = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const author = new Author(db);

const registerAuthor = async (payload) => {
  const postCommand = async payload => author.register(payload);
  return postCommand(payload);
};

const updateAuthor = async (idUser,payload) => {
  const updateCommand = async payload => author.updateOneAuthor(idUser,payload);
  return updateCommand(payload);
};

const deleteAuthor = async(idAuthor, payload) => {
  const postCommand = async payload => author.del(idAuthor, payload);
  return postCommand(payload);
}

module.exports = {
  registerAuthor,
  updateAuthor,
  deleteAuthor
};
