
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const getBook = async (req, res) => {
  const { bookId } = req.params;
  const getData = async () => queryHandler.getBook(bookId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Book', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Book', http.OK);
  };
  sendResponse(await getData());
};

const getAllBook = async (req, res) => {
  const getData = async () => queryHandler.getAllBook();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Book', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Book', http.OK);
  };
  sendResponse(await getData());
};

const putBook = async (req, res)=> {
  const payload = req.body;
  const {bookId} = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.update);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.updateBook(bookId, payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Update Book', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Update Book', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteBook = async (req, res)=> {
  const payload = req.body;
  const {bookId} = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.del);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.deleteBook(bookId, payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Delete Book', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', { result, data: { id: bookId } }, 'Delete Book', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};
// Get Data
// Query Handler
// Domain
// Query

const postBook = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.insert);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.insertBook(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};


module.exports = {
  getBook,
  postBook,
  putBook,
  deleteBook,
  getAllBook,
};
