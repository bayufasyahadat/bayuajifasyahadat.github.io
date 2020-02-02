
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');


const getAuthor = async (req, res) => {
  const { idAuthor } = req.params;
  const getData = async () => queryHandler.getAuthor(idAuthor);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Author', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Author', http.OK);
  };
  sendResponse(await getData());
};

const registerAuthor = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.register);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.registerAuthor(result.data);
  };
  const sendResponse = async (result) => {
    /* eslint no-unused-expressions: [2, { allowTernary: true }] */
    if (result.err)  {
      wrapper.response(res, 'fail', result, 'Register Author', httpError.CONFLICT);
    } else {
      wrapper.response(res, 'success', result, 'Register Author', http.OK);
    }
  };
  sendResponse(await postRequest(validatePayload));
};

const updateAuthor = async (req, res) => {
  const payload = req.body;
  const {idAuthor} = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.register);
  const updateData = async (result) => {
    if (result.err){
      return result;
    }
    return commandHandler.updateAuthor(idAuthor,payload);
  };
  const sendResponse = async (result) => {
    if (result.err)  {
      wrapper.response(res, 'fail', result, 'Update Author', httpError.CONFLICT);
    } else {
      wrapper.response(res, 'success', result, 'Update Author', http.OK);
    }
  };
  sendResponse(await updateData(validatePayload));

};

const deleteAuthor = async (req, res)=> {
  const payload = req.body;
  const {idAuthor} = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.del);
  const deleteRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.deleteAuthor(idAuthor, payload);
  };
  const sendResponse = async (result) => {
    if (result.err)  {
      wrapper.response(res, 'fail', result, 'Delete Author', httpError.NOT_FOUND);
    } else {
      wrapper.response(res, 'success', { result, data: { id: idAuthor } }, 'Delete Author', http.OK);
    }
  };
  sendResponse(await deleteRequest(validatePayload));
  };
  
  const getAllAuthor = async (req, res) => {
    const getData = async () => queryHandler.getAllAuthor();
    const sendResponse = async (result) => {
      (result.err) ? wrapper.response(res, 'fail', result, 'Get Author', httpError.NOT_FOUND)
        : wrapper.response(res, 'success', result, 'Get Author', http.OK);
    };
    sendResponse(await getData());
  };

module.exports = {
  getAuthor,
  registerAuthor,
  updateAuthor,
  deleteAuthor,
  getAllAuthor
};
