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

const PickerWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(31, 100, 212, 0.6);
  z-index: 100;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

export class DayPicker extends React.Component<Props, State> {
  private readonly yearSelect: Array<{ value: string; label: string }>;
  private readonly monthSelect: Array<{ value: string; label: string }>;

  constructor(props: Props) {
    super(props);

    this.monthSelect = moment.months().map(m => ({
      value: m,
      label: m
    }));

    const prevMonth = moment().month();
    const currentYear = moment().year();
    const initialYear = 2016;
    const differenceYear = currentYear - initialYear;
    const selectedStartMonth = this.monthSelect.find((m, i) => i === prevMonth);

    let allYears: Array<number> = [];
    for (let i = 0; i < differenceYear + 1; i++) {
      allYears.push(currentYear - i);
    }

    this.yearSelect = allYears.map(y => ({
      value: String(y),
      label: String(y)
    }));

    const selectedMonth = props.selectedMonth
      ? { value: props.selectedMonth.format("MMMM"), label: props.selectedMonth.format("MMMM") }
      : selectedStartMonth;

    const selectedYear = props.selectedYear
      ? { value: props.selectedYear.year().toString(), label: props.selectedYear.year().toString() }
      : { value: currentYear.toString(), label: currentYear.toString() };

    this.state = {
      selectedStartDate: this.props.selectedStartDate,
      selectedEndDate: this.props.selectedEndDate,
      focusedInput: "startDate",
      selectedMonth,
      selectedYear
    };
  }

  onDatesChange(startDate: moment.Moment | null, endDate: moment.Moment | null) {
    this.setState({ selectedStartDate: startDate, selectedEndDate: endDate }, () => {
      if (startDate && endDate) {
        this.props.onChangeDateRange(startDate, endDate);
      }
    });
  }

  onFocusChange(focusedInput: ReactDates.FocusedInputShape | null) {
    this.setState({
      focusedInput: !focusedInput ? "startDate" : focusedInput
    });
  }

  toggleNextArrow = () => {
    const nextBtn = document.getElementsByClassName("DayPickerNavigation_button")[1];
    const updatedMonth = this.state.selectedMonth;
    const isLastYear = this.yearSelect[0].value === this.state.selectedYear.value;
    const isLastMonth = updatedMonth && this.monthSelect[this.monthSelect.length - 1].value === updatedMonth.value;
    if (isLastMonth && isLastYear) {
      nextBtn.classList.add("ButtonNavigation__disabled");
    } else {
      nextBtn.classList.remove("ButtonNavigation__disabled");
    }
  };

  togglePreviousArrow = () => {
    const previousBtn = document.getElementsByClassName("DayPickerNavigation_button")[0];
    const updatedMonth = this.state.selectedMonth;
    const isFirstYear = this.yearSelect[this.yearSelect.length - 1].value === this.state.selectedYear.value;
    const isFirstMonth = updatedMonth && this.monthSelect[0].value === updatedMonth.value;
    if (isFirstYear && isFirstMonth) {
      previousBtn.classList.add("ButtonNavigation__disabled");
    } else {
      previousBtn.classList.remove("ButtonNavigation__disabled");
    }
  };

  renderMonthElementStyled = (props: {
    month: moment.Moment;
    onMonthSelect: (currentMonth: moment.Moment, newMonthVal: string) => void;
    onYearSelect: (currentMonth: moment.Moment, newYearVal: string) => void;
  }) => {
    const { selectedMonth: selectedStartMonth, selectedYear: selectedStartYear } = this.state;
    const monthSelect = moment.months().map(m => ({
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
        <Select
          isClearable={false}
          isSearchable={false}
          onChange={(option: any) => {
            props.onMonthSelect(props.month, option.value);
            this.setState({ selectedMonth: { value: option.value, label: option.label } }, () => {
              this.toggleNextArrow();
              this.togglePreviousArrow();
            });
          }}
          options={monthSelect}
          style={{ width: 105, marginRight: 3 }}
          value={
            selectedStartMonth
              ? {
                  value: selectedStartMonth.value,
                  label: selectedStartMonth.label
                }
              : null
          }
        />
        <Select
          isClearable={false}
          isSearchable={false}
          onChange={(option: any) => {
            props.onYearSelect(props.month, option.value);
            this.setState({ selectedYear: { value: option.value, label: option.label } }, () => {
              this.toggleNextArrow();
              this.togglePreviousArrow();
            });
          }}
          options={this.yearSelect}
          style={{ width: 75, marginLeft: 3 }}
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
    );
  };

  onPrevMonthClick = (newDate: moment.Moment) => {
    // always enable next button when click on previous
    const nextBtn = document.getElementsByClassName("DayPickerNavigation_button")[1];
    nextBtn.classList.remove("ButtonNavigation__disabled");

    // update selected month, and maybe years if previous month in January
    const year = newDate.year().toString();
    const month = newDate.format("MMMM");
    this.setState(
      {
        selectedYear: { label: year, value: year },
        selectedMonth: { label: month, value: month }
      },
      () => {
        // decide if enable or disable previous
        this.togglePreviousArrow();
      }
    );
  };

  onNextMonthClick = (newDate: moment.Moment) => {
    // always enable previous button when click on next
    const previousBtn = document.getElementsByClassName("DayPickerNavigation_button")[0];
    previousBtn.classList.remove("ButtonNavigation__disabled");

    // update selected month, and maybe years if previous month in December
    // update selected month, and maybe years if previous month in January
    const year = newDate.year().toString();
    const month = newDate.format("MMMM");
    this.setState(
      {
        selectedYear: { label: year, value: year },
        selectedMonth: { label: month, value: month }
      },
      () => {
        // decide if enable or disable next
        this.toggleNextArrow();
      }
    );
  };

  render() {
    const { selectedStartDate, selectedEndDate, focusedInput } = this.state;

    const { className, style } = this.props;

    return (
      <PickerWrapper>
        <Wrapper className={className} style={style}>
          <DayPickerRangeController
            startDate={selectedStartDate}
            firstDayOfWeek={1}
            renderMonthElement={this.renderMonthElementStyled}
            endDate={selectedEndDate}
            onDatesChange={(range: { startDate: moment.Moment | null; endDate: moment.Moment | null }) => {
              this.onDatesChange(range.startDate ? range.startDate : null, range.endDate ? range.endDate : null);
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput: ReactDates.FocusedInputShape | null) => this.onFocusChange(focusedInput)}
            onPrevMonthClick={(newCurrentMonth: moment.Moment) => this.onPrevMonthClick(newCurrentMonth)}
            onNextMonthClick={(newCurrentMonth: moment.Moment) => this.onNextMonthClick(newCurrentMonth)}
            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          />
        </Wrapper>
      </PickerWrapper>
    );
  }
}
