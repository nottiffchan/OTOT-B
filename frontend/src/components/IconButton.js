import React from "react";
import styled from "styled-components";

const IconButton = ({ children, onClick }) => {
  return <StyledIconButton onClick={onClick}>{children}</StyledIconButton>;
};

export default IconButton;

const StyledIconButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  transition: 200ms ease-out;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;

  :hover {
    background-color: #e6e6e6;
  }
`;
