import styled from "styled-components";

const Wrapper = styled.div`
  .CalendarDay__today {
    color: #1f64d4;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.03);
  }

  .CalendarDay__default:hover {
    background: rgba(0, 0, 0, 0.08);
    border: none;
    color: inherit;
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: #1f64d4;
    border: 1px double #1f64d4;
    color: #fff;
  }

  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background: rgb(212, 183, 255);
    border: 1px double #b8cbea;
    color: #1f64d4;
  }

  .CalendarDay__selected_span {
    background: #83adf1;
    border: 1px double #b8cbea;
    color: #fff;
  }

  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    background: rgb(197, 157, 255);
    border: 1px double rgb(197, 157, 255);
    color: #fff;
  }

  .CalendarMonth_caption strong {
    font-weight: normal;
  }

  .DayPickerNavigation_button {
    border: none;
    background: transparent;
  }

  .DayPickerNavigation_button__default {
    background: transparent;
  }

  .DayPickerNavigation_button__default:focus,
  .DayPickerNavigation_button__default:hover {
    border: none;
    outline: none;
    background: transparent;
  }

  .DayPickerNavigation_button__default:active {
    background: transparent;
  }

  .DayPickerNavigation_svg__horizontal {
    stroke: #1f64d4;
    fill: #1f64d4;
    stroke-width: 60px;
  }

  .DayPickerNavigation_svg__horizontal:active {
    stroke: #3e0b8a;
    fill: #3e0b8a;
  }

  .DayPickerKeyboardShortcuts_show {
    display: none;
  }

  .CalendarMonth {
    background: transparent;
  }

  .DayPicker_weekHeader {
    z-index: 1;
  }

  .CalendarMonthGrid {
    z-index: 1;
    background: transparent;
  }

  .CalendarMonth_caption {
    text-align: left;
  }

  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background: #fff;
    border: 1px solid #e4e7e7;
    color: #cacccd;
  }

  .ButtonNavigation__disabled {
    display: none;
  }
`;

export { Wrapper };
