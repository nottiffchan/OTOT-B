import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "./Button";
import axios from "axios";
import IconButton from "./IconButton";
import trashIcon from "../assets/trash.svg";

const DeleteExpenseModal = ({ getAllExpenses, id }) => {
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function deleteExpense() {
    try {
      const { data } = await axios.delete(
        `https://otot-b-cs3219.herokuapp.com/api/expenses/${id}`
      );
      if (data.status === "success") {
        getAllExpenses();
      }
    } catch (error) {
      console.log("error: ", error);
      setErr(error);
    }
  }

  return (
    <>
      <IconButton onClick={handleShow}>
        <img src={trashIcon} alt="" />
      </IconButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this?
          {err && <p>{err}</p>}
        </Modal.Body>
        <Modal.Footer className="mt-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => deleteExpense()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteExpenseModal;
