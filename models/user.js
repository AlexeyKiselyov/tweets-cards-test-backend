const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

// --------mongoose shema--------
const userShema = new Schema(
  {
    user: { type: String },
    tweets: { type: Number },
    followers: {
      type: Number,
    },
    isFollow: { type: Boolean, default: false },
    avatar: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userShema.post('save', handleMongooseError);

// --------Joi shemas--------
const addShema = Joi.object({
  user: Joi.string(),
  tweets: Joi.number(),
  followers: Joi.number(),
  isFollow: Joi.boolean(),
  avatar: Joi.string(),
});

const updateFollowShema = Joi.object({
  isFollow: Joi.boolean(),
  followers: Joi.number(),
});

const schemas = {
  addShema,
  updateFollowShema,
};

const User = model('user', userShema);

module.exports = { User, schemas };
