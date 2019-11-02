import * as React from "react";
import styled, { CSSProperties } from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 0px;
  padding: 8px 10px;
  border-radius: 5px;
  & > a > i {
    font-size: 30px;
  }

  & > a > i.im-plus-circle {
    margin-right: 8px;
  }
`;

const iconStyle: CSSProperties = { color: "rgb(31, 100, 212)", position: "relative", top: 3 };

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
