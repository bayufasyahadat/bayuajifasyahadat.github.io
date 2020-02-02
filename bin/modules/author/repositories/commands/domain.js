
const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError, UnauthorizedError, ConflictError } = require('../../../../helpers/error');

const algorithm = 'aes-256-ctr';
const secretKey = 'Dom@in2018';

class Author {

  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async register(payload) {
    const { name, biodata, profilePic, isActive } = payload;
    const author = await this.query.findOne({ name });

    if (author.data) {
      return wrapper.error(new ConflictError('author already exist'));
    }

    const data = {
      name,
      biodata,
      profilePic,
      isActive
    };

    const { data:result } = await this.command.insertOneAuthor(data);
    return wrapper.data(result);

  }

  async updateOneAuthor(authorId,payload){
    const {data:result} = await this.command.updateOneAuthor(authorId, payload);
    return wrapper.data(result);
  }

  async del(authorId, payload){
    const {data:result} = await this.command.deleteOneAuthor(authorId, payload);
    return wrapper.data(result);
  }

}

module.exports = Author;
