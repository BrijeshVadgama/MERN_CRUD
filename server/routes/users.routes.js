const {
  FetchAllUser,
  FetchSignleUser,
  CreateNewUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.route("/").get(FetchAllUser).post(CreateNewUser);
router.route("/:id").get(FetchSignleUser).put(UpdateUser).delete(DeleteUser);

module.exports = router;
