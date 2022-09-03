Expense = require("./expenseModel");

exports.index = function (req, res) {
  Expense.get(function (err, expenses) {
    if (err) {
      res.status(404);

      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: "Expenses retrieved successfully",
        data: expenses,
      });
    }
  });
};

// Handle create expense actions
exports.new = function (req, res) {
  var expense = new Expense();
  expense.name = req.body.name ? req.body.name : expense.name;
  expense.amount = req.body.amount;
  // save the expense and check for errors
  expense.save(function (err) {
    if (err) {
      res.status(404);

      res.json({
        message: err.message,
        data: [],
      });
    } else {
      res.json({
        message: "New expense created!",
        data: expense,
      });
    }
  });
};

// Handle view expense info
exports.view = function (req, res) {
  Expense.findById(req.params.expense_id, function (err, expense) {
    if (err) {
      res.status(404);
      res.json({
        message: err.message,
        data: [],
      });
    } else {
      res.json({
        message: "expense details loading..",
        data: expense,
      });
    }
  });
};

// Handle update expense info
exports.update = function (req, res) {
  Expense.findById(req.params.expense_id, function (err, expense) {
    if (err) {
      res.status(404);
      res.json({
        message: err.message,
        data: [],
      });
    } else {
      expense.name = req.body.name ? req.body.name : expense.name;
      expense.amount = req.body.amount ? req.body.amount : expense.amount;
      // save the expense and check for errors
      expense.save(function (err) {
        if (err) {
          res.status(404);
          res.json({
            message: err.message,
            data: [],
          });
        }
        res.json({
          message: "Expense Info updated",
          data: expense,
        });
      });
    }
  });
};

// Handle delete expense
exports.delete = function (req, res) {
  Expense.deleteOne(
    {
      _id: req.params.expense_id,
    },
    function (err, expense) {
      if (err) {
        res.status(404);
        res.json({
          message: err.message,
          data: [],
        });
      } else {
        res.json({
          status: "success",
          message: "Expense deleted",
        });
      }
    }
  );
};
