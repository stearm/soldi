import * as React from "react";
import styled, { CSSProperties } from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 20px;
  padding: 10px 15px;
  background: #1f64d4;
  border-radius: 10px;
  & > a > i {
    font-size: 40px;
  }

  & > a > i.im-plus-circle {
    margin-right: 20px;
  }
`;

const iconStyle: CSSProperties = { color: "#ffffff", position: "relative", top: 3 };

export const AddMovementButton: React.FC = () => {
  return (
    <Wrapper>
      <Link to="/add-movement/?type=in">
        <i className="im im-plus-circle" style={iconStyle} />
      </Link>
      <Link to="/add-movement/?type=out">
        <i className="im im-minus-circle" style={iconStyle} />
      </Link>
    </Wrapper>
  );
};
