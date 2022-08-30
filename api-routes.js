// Initialize express router
let router = require("express").Router();
// Set default API response
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
  .get(expenseController.index)
  .post(expenseController.new);
router
  .route("/expenses/:expense_id")
  .get(expenseController.view)
  .put(expenseController.update)
  .delete(expenseController.delete);

// Export API routes
module.exports = router;
