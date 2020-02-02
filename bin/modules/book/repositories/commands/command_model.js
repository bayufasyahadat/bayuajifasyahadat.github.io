const joi = require('joi');

const update = joi.object({
  title: joi.string().required(),
  pic: joi.string().required(),
  description: joi.string().required(),
  bookYear: joi.string().required(),
  page: joi.string().required(),
});

const insert = joi.object({
  title: joi.string().required(),
  pic: joi.string().required(),
  description: joi.string().required(),
  bookYear: joi.string().required(),
  page: joi.string().required(),
});

const del = joi.object({
  title: joi.string().required(),
  pic: joi.string(). required(),
  description: joi.string().required(),
  bookYear: joi.string().required(),
  page: joi.string().required(),
});

module.exports = {
  update,
  insert,
  del,
};
