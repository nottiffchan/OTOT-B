import styled from "styled-components";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <Navbar />
      <StyledTable>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <p style={{ color: "var(--grey-1)" }}>Spent this month</p>
            <h1 style={{ fontWeight: "600", fontSize: "40" }}>$300.00</h1>
          </div>
          <Button>Add Expense</Button>
        </div>

        <Table />
      </StyledTable>
    </div>
  );
}

export default App;

const StyledTable = styled.div`
  border: 1px solid var(--grey-3);
  padding: 32px;
  border-radius: 20px;
  width: 500px;
  margin-top: 40px;

  @media (max-width: 500px) {
    max-width: 100%;
  }
`;
