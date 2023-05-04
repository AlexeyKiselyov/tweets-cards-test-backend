const { User } = require('../models/user');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;
  const skip = (page - 1) * limit;

  const dataCount = await User.count({ ...filter });
  const data = await User.find({ ...filter }, '', { skip, limit });

  res.json({
    total: dataCount,
    page: +page,
    limit: +limit,
    totalPages: Math.ceil(dataCount / limit),
    users: data,
  });
};

const updateFollow = async (req, res) => {
  const { userId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'missing field follow');
  }
  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  updateFollow: ctrlWrapper(updateFollow),
};
