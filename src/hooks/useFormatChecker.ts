import * as React from "react";
import { decimalRegExp } from "../utils";

export const useFormatChecker = (amount: string) => {
  const [isWrongFormat, setIsWrongFormat] = React.useState(false);

  React.useEffect(() => {
    const match = decimalRegExp.test(amount);
    setIsWrongFormat(!match);
  }, [amount]);

  return isWrongFormat;
};
