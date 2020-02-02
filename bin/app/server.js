
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const userHandler = require('../modules/user/handlers/api_handler');
const authorHandler = require('../modules/author/handlers/api_handler');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    //allowHeaders: ['Authorization'],
    //exposeHeaders: ['Authorization']
    allowHeaders: ['Authorization, Origin, X-Requested-With, Content-Type, Accept, OPTIONS'],
    exposeHeaders: ['Authorization, OPTIONS'],
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // authenticated client can access the end point, place code bellow
  this.server.post('/api/users/v1', userHandler.postDataLogin);
  this.server.get('/api/users/v1/:idUser',jwtAuth.verifyToken, userHandler.getUser);
  this.server.put('/api/users/v1/:idUser', userHandler.updateUser);
  this.server.post('/api/users/v1/register', userHandler.registerUser);
  
  //Author
  this.server.get('/api/author/v1', authorHandler.getAllAuthor);
  this.server.post('/api/author/v1/register', authorHandler.registerAuthor);
  this.server.get('/api/author/v1:idAuthor',jwtAuth.verifyToken, authorHandler.getAuthor);
  this.server.put('/api/author/v1/:idAuthor', authorHandler.updateAuthor);
  this.server.del('/api/author/v1/:idAuthor', authorHandler.deleteAuthor);
  //Initiation
  mongoConnectionPooling.init();
}

module.exports = AppServer;
