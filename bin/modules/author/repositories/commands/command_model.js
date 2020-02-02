const joi = require('joi');

const register = joi.object({
  name: joi.string().required(),
  biodata: joi.string().required(),
  profilePic: joi.string().required(),
  isActive : joi.boolean().default(true, 'Example If Need Default Value')
});

const del = joi.object({
  name: joi.string().required(),
  biodata: joi.string().required(),
  profile_pic: joi.string().required(),
  isActive : joi.boolean().default(true, 'Example If Need Default Value')
});

module.exports = {
  register,
  del
};
