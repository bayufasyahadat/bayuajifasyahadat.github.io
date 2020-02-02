
const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const { NotFoundError, UnauthorizedError, ConflictError } = require('../../../../helpers/error');

const algorithm = 'aes-256-ctr';
const secretKey = 'Dom@in2018';

class User {

  constructor(db){
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async generateCredential(payload) {
    const ctx = 'domain-generateCredential';
    const { email, password } = payload;
    const user = await this.query.findOneUser({ email });
    if (user.err) {
      logger.log(ctx, user.err, 'user not found');
      return wrapper.error(new NotFoundError('user not found'));
    }
    const userId = user.data._id;
    const userEmail = user.data.email;
    const pass = await commonUtil.decrypt(user.data.password, algorithm, secretKey);
    if (email !== userEmail || pass !== password) {
      return wrapper.error(new UnauthorizedError('Password invalid!'));
    }
    const data = {
      email,
      sub: userId
    };
    const token = await jwtAuth.generateToken(data);
    return wrapper.data(token);
  }

  async register(payload) {
    const { name, profilePic, email, password, isActive } = payload;
    const user = await this.query.findOneUser({ email });

    if (user.data) {
      return wrapper.error(new ConflictError('user already exist'));
    }
    
    const chiperPwd = await commonUtil.encrypt(password, algorithm, secretKey);
    const data = {
      name,
      email,
      profilePic,
      password: chiperPwd,
      isActive
    };
    const responseData = {
      name,
      email,
      profilePic
    };

    const { data:result } = await this.command.insertOneUser(data);
    return wrapper.data(responseData);

  }

  async updateOneUser(userId,payload){
    const { name, username, password, isActive } = payload;
    const chiperPwd = await commonUtil.encrypt(password, algorithm, secretKey);
    const data = {
      name,
      username,
      password: chiperPwd,
      isActive
    };
    const {data:result} = await this.command.updateOneUser(userId, data);
    return wrapper.data(result);
  }

}

module.exports = User;
