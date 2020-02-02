
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const db = new Mongo(config.get('/mongoDbUrl'));
const user = new User(db);

const postDataLogin = async (payload) => {
  const postCommand = async payload => user.generateCredential(payload);
  return postCommand(payload);
};

const registerUser = async (payload) => {
  const postCommand = async payload => user.register(payload);
  return postCommand(payload);
};

const updateUser = async (idUser,payload) => {
  const updateCommand = async payload => user.updateOneUser(idUser,payload);
  return updateCommand(payload);
};

module.exports = {
  postDataLogin,
  registerUser,
  updateUser
};
