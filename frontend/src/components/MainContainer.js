import styled from "styled-components";
import Table from "./Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import AddExpenseModal from "./AddExpenseModal";

const MainContainer = () => {
  //   const [expenses, setExpenses] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState();

  useEffect(() => {
    getAllExpenses();
  });

  async function getAllExpenses() {
    try {
      const data = await axios.get(
        "https://otot-b-cs3219.herokuapp.com/api/expenses/"
      );

      if (data.data.status === "success") {
        var expenses = data.data.data;

        expenses = filterOutTestEntries(expenses);
        expenses = formatDates(expenses);
        expenses = sortExpensesByDate(expenses);

        //   setExpenses(expenses);
        setTotalSpent(getTotalSpent(expenses));

        var groupedExpensesTemp = groupExpensesByDate(expenses);
        var ordered = {};
        Object.keys(groupedExpensesTemp)
          .sort(function (a, b) {
            return (
              moment(b, "DD/MM/YYYY").toDate() -
              moment(a, "DD/MM/YYYY").toDate()
            );
          })
          .forEach(function (key) {
            ordered[key] = groupedExpensesTemp[key];
          });

        setGroupedExpenses(ordered);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  var getTotalSpent = (expenses) => {
    var sum = 0;
    for (var expense of expenses) {
      sum += expense.amount;
    }
    return sum;
  };

  var filterOutTestEntries = (expenses) => {
    var temp = expenses.filter((expense) => expense.amount > 0);
    return temp;
  };

  var formatDates = (expenses) => {
    var newExpenses = [];
    for (var expense of expenses) {
      var newExpense = {
        _id: expense._id,
        create_date: moment(expense.create_date).format("dddd, DD MMM"),
        name: expense.name,
        amount: expense.amount,
        _v: 0,
      };
      newExpenses.push(newExpense);
    }
    return newExpenses;
  };

  var sortExpensesByDate = (expenses) => {
    var temp = expenses.sort(
      (a, b) =>
        new moment(a.date).format("YYYYMMDD") -
        new moment(b.date).format("YYYYMMDD")
    );
    temp.reverse();
    return temp;
  };

  var groupExpensesByDate = (expenses) => {
    var temp = expenses.reduce((acc, item) => {
      if (!acc[item.create_date]) {
        acc[item.create_date] = [];
      }

      acc[item.create_date].push(item);
      return acc;
    }, {});
    return temp;
  };

  return (
    <StyledTable>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex flex-column">
          <p style={{ color: "var(--grey-1)", marginBottom: "8px" }}>
            Total Spent
          </p>
          <h1 style={{ fontWeight: "600", fontSize: "40" }}>${totalSpent}</h1>
        </div>
        <AddExpenseModal getAllExpenses={getAllExpenses} />
      </div>

      <Table
        groupedExpenses={groupedExpenses}
        getAllExpenses={getAllExpenses}
      />
    </StyledTable>
  );
};

export default MainContainer;

const StyledTable = styled.div`
  border: 1px solid var(--grey-3);
  padding: 32px;
  border-radius: 20px;
  width: 500px;
  margin: 40px auto;

  @media (max-width: 500px) {
    max-width: 100%;
  }
`;
