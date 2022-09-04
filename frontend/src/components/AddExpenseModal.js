import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "./Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

const AddExpenseModal = ({ getAllExpenses }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [err, setErr] = useState("");

  const [invalidName, setInvalidName] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setInvalidName(true);
    } else {
      setInvalidName(false);
    }
    if (!amount) {
      setInvalidAmount(true);
    } else {
      setInvalidAmount(false);
    }

    if (name && amount) {
      try {
        const { data } = await axios.post(
          "https://otot-b-cs3219.herokuapp.com/api/expenses/",
          { name: name, amount: amount }
        );
        console.log("DATADOG", data);
        if (data.message == "New expense created!") {
          getAllExpenses();
          resetForm();
          handleClose();
        }
      } catch (err) {
        console.log("err: ", err);
        setErr(err);
      }
    }
  };

  var resetForm = () => {
    setInvalidName(false);
    setInvalidAmount(false);
    setName("");
    setAmount(undefined);
  };

  return (
    <>
      <Button onClick={handleShow}>Add Expense</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="What did you spend on?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {invalidName && (
                <p style={{ color: "var(--red)" }}>Please enter a name.</p>
              )}
            </Form.Group>

            <div>
              <Form.Label>Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  aria-label="Amount (to the nearest dollar)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
              {invalidAmount && (
                <p style={{ color: "var(--red)" }}>Please enter an amount.</p>
              )}
            </div>
          </Form>

          {err && <p>{err}</p>}
        </Modal.Body>
        <Modal.Footer className="mt-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddExpenseModal;
