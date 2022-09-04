import React from "react";

const Table = ({ groupedExpenses }) => {
  return (
    <>
      {Object.entries(groupedExpenses).map(([key, value]) => {
        return <TableDaySection key={key} date={key} expenses={value} />;
      })}
    </>
  );
};

const TableRow = ({ name, amount }) => {
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

const TableDaySection = ({ date, expenses }) => {
  var sum = 0;
  for (var expense of expenses) {
    sum += expense.amount;
  }

  return (
    <div className="py-3">
      <div className="d-flex justify-content-between align-items-center">
        <p
          style={{
            textTransform: "uppercase",
            color: "#808080",
            fontSize: "14px",
            marginBottom: "0",
          }}
        >
          {date}
        </p>
        <p style={{ color: "#808080", fontSize: "14px", marginBottom: "0" }}>
          ${sum}
        </p>
      </div>
      {expenses.map((expense) => {
        return (
          <TableRow
            name={expense.name}
            amount={expense.amount}
            key={expense._id}
          />
        );
      })}
      <hr style={{ color: "var(--grey-2)" }} />
    </div>
  );
};

export default Table;
