import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function f() {
      try {
        const data = await axios.get("http://localhost:8080/api/expenses/");

        if (data.data.status === "success") {
          const expenses = data.data.data;
          setExpenses(expenses.filter((expense) => expense.amount > 0));
          console.log("expenses: ", expenses);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
    f();
  }, []);

  return (
    <div>
      {expenses.map((expense) => {
        return (
          <TableRow
            name={expense.name}
            amount={expense.amount}
            key={expense._id}
          />
        );
      })}
    </div>
  );
};

export const TableRow = ({ name, amount }) => {
  return (
    <div>
      <hr style={{ color: "var(--grey-2)" }} />
      <div className="mt-3 d-flex align-items-center justify-content-between">
        <p style={{ fontWeight: 600, marginBottom: 0 }}>{name}</p>
        <p style={{ fontWeight: 600, marginBottom: 0 }}>${amount}</p>
      </div>
    </div>
  );
};

export default Table;
