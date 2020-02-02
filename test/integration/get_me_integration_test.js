const assert = require('assert');
const sinon = require('sinon');
const hippie = require('hippie');
const jwt = require('jsonwebtoken');
const user = require('../../bin/modules/user/repositories/queries/domain');
const db = require('../../bin/helpers/databases/mongodb/db');
const AppServer = require('../../bin/app/server');

describe('Get Me', () => {

  let appServer;

  let result = {
    'err': false,
    'data': {
      '_id': '5bac53b45ea76b1e9bd58e1c',
      'username': 'alifsndev',
      'password': '8789ad457ac341e4fc4cad32'
    }
  };

  let decodedToken = {
    'username': 'alifsn',
    'sub': '5bac53b45ea76b1e9bd58e1c',
    'iat': 1540469257,
    'exp': 1540475257,
    'aud': '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    'iss': 'telkomdev'
  };

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
    sinon.stub(jwt, 'verify').resolves(decodedToken);
  });

  afterEach(function () {
    this.server.close();
    jwt.verify.restore();
  });

  it('Should error when view user for /api/users/v1', function (done) {

    hippie(this.server)
      .header('authorization','')
      .get('/api/users/v1')
      .expectStatus(403)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        done();
      });
  });

  it('Should return data for /api/users/v1', function (done) {

    sinon.stub(db.prototype, 'findOne').resolves(result);
    sinon.stub(user.prototype, 'viewUser').resolves(result);

    hippie(this.server)
      .header('authorization', 'Bearer dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .get('/api/users/v1')
      .expectStatus(200)
      .end((err, res, body) => {

        if(err){
          throw err;
        }

        let obj = JSON.parse(body);
        assert.equal(obj.status, result.status);
        assert.equal(obj.data.username, result.data.username);

        db.prototype.findOne.restore();
        user.prototype.viewUser.restore();
        done();
      });
  });

  it('Should return no data for /api/users/v1', function (done) {

    result = {
      'err': true,
      'data': null
    };

    sinon.stub(user.prototype, 'viewUser').resolves(result);

    hippie(this.server)
      .header('authorization', 'Bearer dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==')
      .get('/api/users/v1')
      .end((err, res, body) => {

        if(err){
          throw err;
        }

        const result = JSON.parse(body);
        assert.equal(result.code, 403);
        assert.equal(result.data, '');

        user.prototype.viewUser.restore();
        done();
      });
  });

});
