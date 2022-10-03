let router = require("express").Router();
let {
  checkAuthorisation,
  checkAuthentication,
} = require("./middleware/check-auth");
const authController = require("./controllers/authController");
const expenseController = require("./controllers/expenseController");

router.get("/", function (req, res) {
  res.json({
    status: "API is working",
    message: "Welcome to Spendy!",
  });
});

router.post("/signup", authController.signup);
router.post("/auth", authController.auth);
router.get("/users", checkAuthorisation("admin"), authController.getAllUsers);

router
  .route("/expenses")
  .get(checkAuthorisation("admin"), expenseController.index)
  .post(checkAuthentication, expenseController.new);
router
  .route("/expenses/:expense_id")
  .get(checkAuthentication, expenseController.view)
  .put(expenseController.update)
  .delete(expenseController.delete);

router.route("/convert").get(expenseController.convert);

module.exports = router;
