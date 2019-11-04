import * as React from "react";
import moment from "moment";
import styled from "styled-components";

import { DayPickerRangeController, isInclusivelyBeforeDay } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import ReactDates from "react-dates";
import Select from "react-select";
import { Wrapper } from "./styles";

type Props = {
  onChangeDateRange: (startDate: moment.Moment | null, endDate: moment.Moment | null) => void;
  onClickOutside: () => void;
  selectedStartDate: moment.Moment | null;
  selectedEndDate: moment.Moment | null;
  selectedMonth?: moment.Moment | null;
  selectedYear?: moment.Moment | null;
  style?: React.CSSProperties;
} & React.HTMLProps<HTMLDivElement>;

type State = {
  selectedStartDate: moment.Moment | null;
  selectedEndDate: moment.Moment | null;
  focusedInput: ReactDates.FocusedInputShape;
  selectedMonth: { value: string; label: string } | undefined;
  selectedYear: { value: string; label: string };
};

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    fontSize: 12
  }),
  singleValue: (provided: any) => {
    return { ...provided, fontSize: 12 };
  },
  menuList: (provided: any) => {
    return { ...provided };
  }
};

const PickerWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(31, 100, 212, 0.6);
  z-index: 100;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

const Button = styled.button`
  font-weight: 900;
  margin-top: 20px;
`;

export const DayPicker: React.FC<Props> = props => {
  const monthSelect = moment.months("MM").map(m => ({
    value: m,
    label: m
  }));

  const prevMonth = moment().month();
  const currentYear = moment().year();
  const initialYear = 2016;
  const differenceYear = currentYear - initialYear;
  const selectedStartMonth = monthSelect.find((_, i) => i === prevMonth);

  let allYears: Array<number> = [];
  for (let i = 0; i < differenceYear + 1; i++) {
    allYears.push(currentYear - i);
  }

  const yearSelect = allYears.map(y => ({
    value: String(y),
    label: String(y)
  }));

  const selectedMonth = props.selectedMonth
    ? { value: props.selectedMonth.format("MM"), label: props.selectedMonth.format("MM") }
    : selectedStartMonth;

  const selectedYear = props.selectedYear
    ? { value: props.selectedYear.year().toString(), label: props.selectedYear.year().toString() }
    : { value: currentYear.toString(), label: currentYear.toString() };

  const [state, setState] = React.useState<State>({
    selectedStartDate: props.selectedStartDate,
    selectedEndDate: props.selectedEndDate,
    focusedInput: "startDate",
    selectedMonth,
    selectedYear
  });

  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  React.useEffect(() => {
    const toggleNextArrow = () => {
      const nextBtn = document.getElementsByClassName("DayPickerNavigation_button")[1];
      const updatedMonth = selectedMonth;
      const isLastYear = yearSelect[0].value === state.selectedYear.value;
      const isLastMonth = updatedMonth && monthSelect[monthSelect.length - 1].value === updatedMonth.value;
      if (isLastMonth && isLastYear) {
        nextBtn.classList.add("ButtonNavigation__disabled");
      } else {
        nextBtn.classList.remove("ButtonNavigation__disabled");
      }
    };

    const togglePreviousArrow = () => {
      const previousBtn = document.getElementsByClassName("DayPickerNavigation_button")[0];
      const updatedMonth = state.selectedMonth;
      const isFirstYear = yearSelect[yearSelect.length - 1].value === state.selectedYear.value;
      const isFirstMonth = updatedMonth && monthSelect[0].value === updatedMonth.value;
      if (isFirstYear && isFirstMonth) {
        previousBtn.classList.add("ButtonNavigation__disabled");
      } else {
        previousBtn.classList.remove("ButtonNavigation__disabled");
      }
    };

    toggleNextArrow();
    togglePreviousArrow();
  }, [selectedMonth, monthSelect, yearSelect, state.selectedMonth, state.selectedYear]);

  const onDatesChange = (startDate: moment.Moment | null, endDate: moment.Moment | null) => {
    setState(state => ({ ...state, selectedStartDate: startDate, selectedEndDate: endDate }));
  };

  const onFocusChange = (focusedInput: ReactDates.FocusedInputShape | null) => {
    setState(state => ({ ...state, focusedInput: !focusedInput ? "startDate" : focusedInput }));
  };

  const renderMonthElementStyled = (props: {
    month: moment.Moment;
    onMonthSelect: (currentMonth: moment.Moment, newMonthVal: string) => void;
    onYearSelect: (currentMonth: moment.Moment, newYearVal: string) => void;
  }) => {
    const { selectedMonth: selectedStartMonth, selectedYear: selectedStartYear } = state;
    const monthSelect = moment.months("MM").map(m => ({
      value: m,
      label: m
    }));

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: -10
        }}
      >
        <div style={{ flexBasis: "40%", marginRight: 8 }}>
          <Select
            isClearable={false}
            isSearchable={false}
            onChange={(option: any) => {
              props.onMonthSelect(props.month, option.value);
              setState(state => ({ ...state, selectedMonth: { value: option.value, label: option.label } }));
            }}
            options={monthSelect}
            styles={customStyles}
            value={
              selectedStartMonth
                ? {
                    value: selectedStartMonth.value,
                    label: selectedStartMonth.label
                  }
                : null
            }
          />
        </div>
        <div style={{ flexBasis: "30%" }}>
          <Select
            isClearable={false}
            isSearchable={false}
            onChange={(option: any) => {
              props.onYearSelect(props.month, option.value);
              setState(state => ({ ...state, selectedYear: { value: option.value, label: option.label } }));
            }}
            options={yearSelect}
            styles={customStyles}
            value={
              selectedStartYear
                ? {
                    value: selectedStartYear.value,
                    label: selectedStartYear.label
                  }
                : null
            }
          />
        </div>
      </div>
    );
  };

  const onPrevMonthClick = (newDate: moment.Moment) => {
    // always enable next button when click on previous
    const nextBtn = document.getElementsByClassName("DayPickerNavigation_button")[1];
    nextBtn.classList.remove("ButtonNavigation__disabled");

    // update selected month, and maybe years if previous month in January
    const year = newDate.year().toString();
    const month = newDate.format("MM");
    setState(state => ({
      ...state,
      selectedYear: { label: year, value: year },
      selectedMonth: { label: month, value: month }
    }));
  };

  const onNextMonthClick = (newDate: moment.Moment) => {
    // always enable previous button when click on next
    const previousBtn = document.getElementsByClassName("DayPickerNavigation_button")[0];
    previousBtn.classList.remove("ButtonNavigation__disabled");

    // update selected month, and maybe years if previous month in December
    // update selected month, and maybe years if previous month in January
    const year = newDate.year().toString();
    const month = newDate.format("MM");
    setState(state => ({
      ...state,
      selectedYear: { label: year, value: year },
      selectedMonth: { label: month, value: month }
    }));
  };

  return (
    <PickerWrapper onClick={props.onClickOutside}>
      <Wrapper className={props.className} style={props.style}>
        <DayPickerRangeController
          startDate={state.selectedStartDate}
          firstDayOfWeek={1}
          renderMonthElement={renderMonthElementStyled}
          endDate={state.selectedEndDate}
          onDatesChange={(range: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => {
            onDatesChange(range.startDate ? range.startDate : null, range.endDate ? range.endDate : null);
          }}
          focusedInput={state.focusedInput}
          onFocusChange={(focusedInput: ReactDates.FocusedInputShape | null) => onFocusChange(focusedInput)}
          onPrevMonthClick={(newCurrentMonth: moment.Moment) => onPrevMonthClick(newCurrentMonth)}
          onNextMonthClick={(newCurrentMonth: moment.Moment) => onNextMonthClick(newCurrentMonth)}
          isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
        />
        <Button
          onClick={_ =>
            state.selectedStartDate &&
            state.selectedEndDate &&
            props.onChangeDateRange(state.selectedStartDate, state.selectedEndDate)
          }
        >
          Apply
        </Button>
      </Wrapper>
    </PickerWrapper>
  );
};
