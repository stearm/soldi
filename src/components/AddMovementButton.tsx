import * as React from "react";
import styled, { CSSProperties } from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 20px;
  padding: 10px 15px;
  background: #1f64d4;
  border-radius: 10px;
  & > i {
    font-size: 40px;
  }

  & > i:first-child {
    margin-right: 20px;
  }
`;

const iconStyle: CSSProperties = { color: "#ffffff", position: "relative", top: 3 };

export const AddMovementButton: React.FC = () => {
  return (
    <Wrapper>
      <i className="im im-plus-circle" style={iconStyle} />
      <i className="im im-minus-circle" style={iconStyle} />
    </Wrapper>
  );
};
