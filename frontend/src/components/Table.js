import React from "react";
import styled from "styled-components";
import UpdateExpenseModal from "./UpdateExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";

const Table = ({ groupedExpenses, getAllExpenses }) => {
  return (
    <>
      {Object.entries(groupedExpenses).map(([key, value]) => {
        return (
          <TableDaySection
            key={key}
            date={key}
            expenses={value}
            getAllExpenses={getAllExpenses}
          />
        );
      })}
    </>
  );
};

const TableDaySection = ({ date, expenses, getAllExpenses }) => {
  var sum = 0;
  for (var expense of expenses) {
    sum += expense.amount;
  }

  return (
    <StyledTableDaySection className="py-3">
      <div className="mb-2 px-2 d-flex justify-content-between align-items-center">
        <p className="date head-text">{date}</p>
        <p className="head-text">${sum}</p>
      </div>

      {expenses.map((expense) => {
        return (
          <TableRow
            getAllExpenses={getAllExpenses}
            name={expense.name}
            amount={expense.amount}
            id={expense._id}
            key={expense._id}
          />
        );
      })}
    </StyledTableDaySection>
  );
};

const TableRow = ({ name, amount, id, getAllExpenses }) => {
  return (
    <div>
      <hr style={{ color: "var(--grey-2)", margin: "0" }} />

      <StyledTableRow>
        <div className="d-flex align-items-center justify-content-between">
          <p>{name}</p>
          <div className="d-flex align-items-center">
            <p>${amount}</p>
            <div className="iconbutton">
              <UpdateExpenseModal
                getAllExpenses={getAllExpenses}
                currName={name}
                currAmount={amount}
                id={id}
              />
            </div>
            <div className="iconbutton">
              <DeleteExpenseModal getAllExpenses={getAllExpenses} id={id} />
            </div>
          </div>
        </div>
      </StyledTableRow>

      <hr style={{ color: "var(--grey-2)", margin: "0" }} />
    </div>
  );
};

const StyledTableDaySection = styled.div`
  .head-text {
    color: #808080;
    font-size: 14px;
    margin-bottom: 0;
    font-weight: 500;
  }

  .date {
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
`;

const StyledTableRow = styled.div`
  background-color: white;
  transition: 200ms ease-out;
  padding: 16px 8px;

  .iconbutton {
    display: none;
    margin-left: 8px;
  }

  :hover {
    background-color: #fafafa;

    .iconbutton {
      display: block;
    }
  }

  p {
    font-weight: 600;
    margin-bottom: 0;
  }
`;

export default Table;
