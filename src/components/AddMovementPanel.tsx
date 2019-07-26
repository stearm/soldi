import * as React from "react";
import styled from "styled-components";
import { BalanceSpan } from "./styles/BalanceSpan";
import { MovementType, MovementInfoAndIcon } from "../types/MovementType";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5%;
`;

const TypeSpan = styled.span`
  font-size: 40px;
  font-weight: 800;
`;

const Categories = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-row-gap: 60px;
  justify-items: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 40px;
`;

const Category = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  grid-row-gap: 15px;
  justify-items: center;
`;

const MovementInput = styled.input`
  padding: 20px 0px;
  font-size: 55px;
  width: 100%;
`;

export const AddMovementPanel: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <TypeSpan>Income</TypeSpan>
      </div>
      <div>
        <MovementInput type="text" />
      </div>
      <Categories>
        {Object.keys(MovementInfoAndIcon).map((mt, i) => {
          const { icon, info } = MovementInfoAndIcon[mt as MovementType];
          return (
            <Category key={i}>
              <i style={{ alignSelf: "center", fontSize: 40 }} className={`im ${icon}`} />
              <span style={{ textAlign: "center" }}>{info}</span>
            </Category>
          );
        })}
      </Categories>
    </Wrapper>
  );
};
