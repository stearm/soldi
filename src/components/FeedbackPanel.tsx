import * as React from "react";
import styled from "styled-components";
import { ShowFeedbackContext } from "../ShowFeedbackContext";
import { CSSTransition } from "react-transition-group";

const porcellinoTriste = require("../assets/porcellinoTriste.gif");
const porcellinoFelice = require("../assets/porcellinoFelice.gif");

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.24);
  padding: 10px;
`;

const porcellini = {
  in: porcellinoFelice,
  out: porcellinoTriste
};

export const FeedbackPanel: React.FC = () => {
  const { show, type, info } = React.useContext(ShowFeedbackContext);
  return (
    <CSSTransition in={show} timeout={300} classNames="alert" unmountOnExit>
      <Wrapper>
        <img alt="porcellino" style={{ width: 125 }} src={porcellini[type]} />
        <div style={{ fontWeight: 800, fontSize: 15 }}>{info}</div>
      </Wrapper>
    </CSSTransition>
  );
};
