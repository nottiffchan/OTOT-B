import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import IconButton from "./IconButton";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import settings from "../assets/settings.svg";
import Button from "./Button";

const ChangeCurrencyModal = ({ currCurrency, totalSpent, parentCallback }) => {
  const [show, setShow] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currCurrency);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var currencies = [
    { countryCode: "AU", symbol: "AUD", currency: "Australian Dollar" },
    { countryCode: "CN", symbol: "CNY", currency: "Chinese Yuan" },
    { countryCode: "GB", symbol: "GBP", currency: "British Pound Sterling" },
    { countryCode: "HK", symbol: "HKD", currency: "Hong Kong Dollar" },
    { countryCode: "JP", symbol: "JPY", currency: "Japanese Yen" },
    { countryCode: "MY", symbol: "MYR", currency: "Malaysian Ringgit" },
    { countryCode: "KR", symbol: "KRW", currency: "South Korean Won" },
    { countryCode: "SG", symbol: "SGD", currency: "Singapore Dollar" },
    { countryCode: "US", symbol: "USD", currency: "United States Dollar" },
  ];

  async function convertCurrency(event) {
    setIsLoading(true);
    event.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:8080/api/convert", {
        params: {
          from: "SGD",
          to: selectedCurrency,
          amount: 1,
        },
      });
      parentCallback(data.data, selectedCurrency);
      // parentCallback(data.data, selectedCurrency, totalSpent * data.data);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
      setErr("Something went wrong.");
    }
  }

  return (
    <>
      <IconButton onClick={handleShow} style={{ marginLeft: "4px" }}>
        <img src={settings} alt="" />
      </IconButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Currency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {Object.keys(currencies).map((currency, index) => {
              return (
                <Col
                  sm={4}
                  key={index}
                  onClick={() =>
                    setSelectedCurrency(currencies[currency].symbol)
                  }
                >
                  <SelectionTile
                    selected={currencies[currency].symbol === selectedCurrency}
                    symbol={currencies[currency].symbol}
                    currency={currencies[currency].currency}
                    countryCode={currencies[currency].countryCode}
                  />
                </Col>
              );
            })}
          </Row>

          {err && <p>{err}</p>}
        </Modal.Body>
        <Modal.Footer className="mt-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            loading={isLoading}
            onClick={convertCurrency}
            style={{ width: "150px" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeCurrencyModal;

const SelectionTile = ({ selected = false, symbol, currency, countryCode }) => {
  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return (
    <StyledSelectionTile className={selected ? "selected" : ""}>
      <div className="flag">{getFlagEmoji(countryCode)}</div>
      <h4>{symbol}</h4>
      <p>{currency}</p>
    </StyledSelectionTile>
  );
};

const StyledSelectionTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 8px;
  border-radius: 10px;
  background-color: #ffffff;
  text-align: center;
  cursor: pointer;
  transition: 200ms ease-out;
  height: 150px;
  margin: 4px 0;

  :hover {
    background-color: var(--grey-3);
  }

  &.selected {
    background-color: var(--grey-3);
  }

  .flag {
    font-size: 32px;
  }

  h4 {
    font-size: 20px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
  }
`;
