import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link as RouterLink } from "react-router-dom";
import { parse } from "query-string";
import { MovementType, MovementInfoAndIcon } from "../types/MovementType";
import { CreateMovementMutationFN } from "../containers/AddMovementContainer";
import { useFormatChecker } from "../hooks/useFormatChecker";
import { ShowFeedbackContext } from "../ShowFeedbackContext";

const Link = styled(RouterLink)`
  text-decoration: none;
  color: black;
  margin-right: 10px;
`;

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

const DescriptionInput = styled.input`
  padding: 20px 0px;
  font-size: 30px;
  width: 100%;
`;

type Props = RouteComponentProps & { loading: boolean; error?: string; create: CreateMovementMutationFN };

export const AddMovementPanel: React.FC<Props> = ({ location, loading, error, create }) => {
  const [state, setState] = React.useState({
    amount: "",
    description: "",
    date: Date.now()
  });

  const isWrongFormat = useFormatChecker(state.amount);
  const wrongFormatStyle = { color: isWrongFormat ? "grey" : "black" };

  const showFeedback = React.useContext(ShowFeedbackContext);

  const queryParams = parse(location.search);
  const movementType = queryParams.type !== "in" && queryParams.type !== "out" ? "in" : queryParams.type;
  const withSignAmount = movementType === "out" ? -state.amount : state.amount;

  return (
    <Wrapper>
      <div>
        <Link to="/">
          <i className="im im-arrow-left" style={{ top: 3 }} />
        </Link>
        <TypeSpan>{!movementType || movementType === "in" ? "Income" : "Expense"}</TypeSpan>
      </div>
      <div>
        <MovementInput
          type="text"
          value={state.amount}
          placeholder="Amount"
          onChange={e => {
            setState({ ...state, amount: e.target.value });
          }}
        />
        <DescriptionInput
          type="text"
          placeholder="Description"
          value={state.description}
          onChange={e => {
            setState({ ...state, description: e.target.value });
          }}
        />
      </div>
      <Categories>
        {Object.keys(MovementInfoAndIcon).map((mt, i) => {
          const { icon, info } = MovementInfoAndIcon[mt as MovementType];
          return (
            <Category
              key={i}
              onClick={async () => {
                if (!isWrongFormat) {
                  try {
                    await create({
                      variables: {
                        amount: Number(withSignAmount),
                        type: mt as MovementType,
                        description: state.description
                      }
                    });

                    showFeedback.toggle(movementType, `${String(withSignAmount)} in ${info}`);
                    window.history.back();
                  } catch (err) {
                    throw new Error("Whops, something went wrong!");
                  }
                }
              }}
            >
              <i style={{ alignSelf: "center", fontSize: 40, ...wrongFormatStyle }} className={`im ${icon}`} />
              <span style={{ textAlign: "center", ...wrongFormatStyle }}>{info}</span>
            </Category>
          );
        })}
      </Categories>
    </Wrapper>
  );
};
