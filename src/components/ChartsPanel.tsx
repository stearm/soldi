import * as React from "react";
import moment from "moment";
import styled from "styled-components";
import { line, curveMonotoneX } from "d3-shape";
import { scaleTime, scaleLinear } from "d3-scale";
import { max, min } from "d3-array";

const wrapperHeight = 250;

const Wrapper = styled.div`
  width: 100%;
  height: ${wrapperHeight}px;
  border-radius: 10px;
  background: #f7f7f7;
  margin-bottom: 15px;
`;

type Pair = [Date, number];
type LineData = Array<Pair>;
const data: LineData = [
  [moment().toDate(), 0],
  [
    moment()
      .add(2, "day")
      .toDate(),
    20
  ],
  [
    moment()
      .add(4, "day")
      .toDate(),
    20
  ],
  [
    moment()
      .add(9, "day")
      .toDate(),
    25
  ],
  [
    moment()
      .add(15, "day")
      .toDate(),
    60
  ],
  [
    moment()
      .add(17, "day")
      .toDate(),
    225
  ],
  [
    moment()
      .add(18, "day")
      .toDate(),
    200
  ]
];

const onlyDates = data.map(d => d[0]);
const onlyValues = data.map(d => d[1]);

const xDomain = [min(onlyDates)!, max(onlyDates)!];
const yDomain = [min(onlyValues)!, max(onlyValues)!];

const xScale = scaleTime()
  .domain(xDomain)
  .range([0, 391]);

const yScale = scaleLinear()
  .domain(yDomain)
  .range([250, 0]);

// const normalize = (size: number, data: LineData): LineData => data.map(([x, y]) => [x, size - y] as Pair);
const getLinePath = (size: number, data: LineData) =>
  line<Pair>()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]))
    .curve(curveMonotoneX)(data) || undefined;

// https://bl.ocks.org/robyngit/89327a78e22d138cff19c6de7288c1cf

export const ChartsPanel: React.FC = () => {
  return (
    <Wrapper>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d={getLinePath(wrapperHeight, data)} stroke="#47449D" strokeWidth="4" fill="none" />
        </g>
      </svg>
    </Wrapper>
  );
};
