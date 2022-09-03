import React from "react";
import styled from "styled-components";

const IconButton = ({ children }) => {
  return <div>{children}</div>;
};

export default IconButton;

const StyledIconButton = styled.div`
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  transition: 200ms ease-out;
  justify-content: center;
  background-color: #fff;

  :hover {
    background-color: #f8f6f5;
  }
`;
