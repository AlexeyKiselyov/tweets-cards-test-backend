const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const users = await User.find({}, "", { skip, limit });
  res.json(users);
};

const getById = async (req, res) => {
  const { userId } = req.params;
  const userById = await User.findById(userId);

  if (!userById) {
    throw HttpError(404, "Not Found");
  }

  res.json(userById);
};

const updateFollow = async (req, res) => {
  const { userId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing field follow");
  }
  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateFavorite: ctrlWrapper(updateFollow),
};
