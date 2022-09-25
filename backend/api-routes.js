let router = require("express").Router();
let checkAuth = require("./middleware/check-auth");

router.get("/", function (req, res) {
  res.json({
    status: "API is working",
    message: "Welcome to Spendy!",
  });
});

var expenseController = require("./expenseController");
// expense routes
router
  .route("/expenses")
  .get(checkAuth, expenseController.index)
  .post(expenseController.new);
router
  .route("/expenses/:expense_id")
  .get(expenseController.view)
  .put(expenseController.update)
  .delete(expenseController.delete);
router.route("/convert").get(expenseController.convert);

const { auth, signup } = require("./controllers/authController");
router.post("/signup", signup);
router.post("/auth", auth);

// Export API routes
module.exports = router;
