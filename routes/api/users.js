const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/users");

const express = require("express");
const router = express.Router();

router.get("/", ctrl.getAll);

// router.patch(
//   "/:userId/follow",
//   // validateBody(schemas.updateFollowShema),
//   ctrl.updateFollow
// );

module.exports = router;
