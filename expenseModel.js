var mongoose = require("mongoose");
// Setup schema
var expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export expense model
var Expense = (module.exports = mongoose.model("expense", expenseSchema));
module.exports.get = function (callback, limit) {
  Expense.find(callback).limit(limit);
};
