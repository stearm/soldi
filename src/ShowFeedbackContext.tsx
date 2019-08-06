import * as React from "react";

type FeedbackType = "in" | "out";
type ShowFeedbackT = {
  show: boolean;
  type: FeedbackType;
  info: string | null;
  toggle: (type: FeedbackType, info: string) => any;
};
const initialShowFeedbackValue = {
  show: false,
  type: "in" as FeedbackType,
  info: null,
  toggle: (type: FeedbackType, info: string) => {}
};
const ShowFeedbackContext = React.createContext<ShowFeedbackT>(initialShowFeedbackValue);

const ShowFeedbackProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<Pick<ShowFeedbackT, "show" | "type" | "info">>({
    show: false,
    type: "in",
    info: null
  });

  React.useEffect(() => {
    if (state.show) {
      const timeoutId = setTimeout(() => {
        setState(state => ({ ...state, show: false, info: null }));
      }, 2000);

      return () => clearInterval(timeoutId);
    }
  }, [state.show]);

  return (
    <ShowFeedbackContext.Provider
      value={{
        ...state,
        toggle: (type: FeedbackType, info: string) => setState({ show: true, type, info })
      }}
    >
      {children}
    </ShowFeedbackContext.Provider>
  );
};

export { ShowFeedbackProvider, ShowFeedbackContext, initialShowFeedbackValue };
