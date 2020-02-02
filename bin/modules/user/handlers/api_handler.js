
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const postDataLogin = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.postDataLogin(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Login User failed')
      : wrapper.response(res, 'success', result, 'Login User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const getUser = async (req, res) => {
  const { idUser } = req.params;
  const getData = async () => queryHandler.getUser(idUser);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get User', http.OK);
  };
  sendResponse(await getData());
};

const registerUser = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.register);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.registerUser(result.data);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    if (result.err)  {
      wrapper.response(res, 'fail', result, 'Register User failed', httpError.CONFLICT);
    } else {
      wrapper.response(res, 'success', result, 'Register User', http.OK);
    }
  };
  sendResponse(await postRequest(validatePayload));
};

const updateUser = async (req, res) => {
  const payload = req.body;
  const {idUser} = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.register);
  const updateData = async (result) => {
    if (result.err){
      return result;
    }
    return commandHandler.updateUser(idUser,payload);
  };
  const sendResponse = async (result) => {
    if (result.err)  {
      wrapper.response(res, 'fail', result, 'Update User', httpError.CONFLICT);
    } else {
      wrapper.response(res, 'success', result, 'Update User', http.OK);
    }
  };
  sendResponse(await updateData(validatePayload));
};



module.exports = {
  postDataLogin,
  getUser,
  registerUser,
  updateUser
};
