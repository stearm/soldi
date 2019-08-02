import * as React from "react";

type FeedbackType = "in" | "out";
type ShowFeedbackT = { show: boolean; type: FeedbackType; toggle: (type: FeedbackType) => any };
const initialShowFeedbackValue = {
  show: false,
  type: "in" as FeedbackType,
  toggle: (type: FeedbackType) => {}
};
const ShowFeedbackContext = React.createContext<ShowFeedbackT>(initialShowFeedbackValue);

const ShowFeedbackProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<Pick<ShowFeedbackT, "show" | "type">>({ show: false, type: "in" });

  React.useEffect(() => {
    if (state.show) {
      const timeoutId = setTimeout(() => {
        setState(state => ({ ...state, show: false }));
      }, 3000);

      return () => clearInterval(timeoutId);
    }
  }, [state.show]);

  return (
    <ShowFeedbackContext.Provider
      value={{
        ...state,
        toggle: (type: FeedbackType) => setState({ show: true, type })
      }}
    >
      {children}
    </ShowFeedbackContext.Provider>
  );
};

export { ShowFeedbackProvider, ShowFeedbackContext, initialShowFeedbackValue };
