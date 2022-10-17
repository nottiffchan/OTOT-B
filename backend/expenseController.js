Expense = require("./expenseModel");
fetch = require("node-fetch");
const { Headers } = fetch;
const redis = require("redis").createClient();
(async () => {
  redis.on("error", (err) => {
    console.log("Redis Client Error", err);
  });
  redis.on("ready", () => console.log("Redis is ready"));

  await redis.connect();

  await redis.ping();
})();
exports.convert = function (req, res) {
  let myHeaders = new Headers();

  myHeaders.append("apikey", "D2Nd5sVTUN7fyUpB5XMlUsHpYcKA56Dv");
  var from = req.query.from;
  var to = req.query.to;
  var amount = req.query.amount;

  if (!from || !to || !amount) {
    res.status(404);

    res.json({
      status: "failed",
      message: "Please supply to, from, amount parameters",
    });
  } else {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        res.json({
          status: "success",
          data: JSON.parse(result).result,
        });
      })
      .catch((error) => {
        res.status(404);

        res.json({
          status: "failed",
          message: err,
        });
      });
  }
};

exports.index = async function (req, res) {
  try {
    const data = await redis.get("expenses");
    // const data = null;

    if (data) {
      console.log("Retrived from cache");
      res.json(JSON.parse(data));
    } else {
      Expense.get(function (err, expenses) {
        if (err) {
          res.status(404);
          res.json({
            status: "error",
            message: err,
          });
        } else {
          redis.SETEX("expenses", 30, JSON.stringify(expenses));
          console.log("Data from MongoDB");

          res.json({
            status: "success",
            message: "Expenses retrieved successfully",
            data: expenses,
          });
        }
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      status: "error",
      message: error,
    });
  }
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
        message: "Invalid expense!",
        data: [],
      });
    } else {
      res.json({
        message: "Success!",
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
        message: "Invalid expense!",
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
            message: "Invalid expense!",
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
          message: "Invalid expense!",
          status: "failed",
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
