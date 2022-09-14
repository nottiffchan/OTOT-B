import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const Button = ({
  children,
  onClick,
  variant = "primary",
  loading = false,
  ...props
}) => {
  return (
    <StyledButton
      className={`${loading ? "disabled" : ""} ${variant}`}
      onClick={loading ? () => {} : onClick}
      {...props}
    >
      {loading ? <Spinner animation="border" variant="light" /> : children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  transition: 200ms ease-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  height: 40px;
  font-weight: 500;
  cursor: pointer;

  &.disabled {
    cursor: default;
    opacity: 0.4;
    pointer-events: none !important;
  }

  &.primary {
    color: #fff;
    background: #000000;
    transition: 200ms;
  }
  &.primary:hover {
    /* background-color: #262626; */
    background: linear-gradient(102.73deg, #f1087e -1.51%, #fc945f 131.82%);
  }

  &.secondary {
    color: #000000;
    background-color: var(--grey-3);
  }
  &.secondary:hover {
    background-color: var(--grey-2);
  }

  &.destructive {
    color: #fff;
    background-color: var(--red);
  }
  &.destructive:hover {
    background-color: #b91c1c;
  }
`;

export default Button;
