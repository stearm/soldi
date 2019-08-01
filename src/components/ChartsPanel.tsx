import * as React from "react";
import moment from "moment";
import styled from "styled-components";
import { line, curveNatural, arc, pie, PieArcDatum } from "d3-shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "d3-scale";
import { max, min } from "d3-array";
import { groupBy, sumBy } from "lodash";
import SwipeableViews from "react-swipeable-views";
import { Movement } from "../types/Movement";
import { LineData, Pair } from "../types/Charts";
import { MovementType, MovementInfoAndIcon } from "../types/MovementType";

interface Props {
  startBalance: number;
  movements: Array<Movement>;
}

const Wrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => `${props.height}px`};
  border-radius: 10px;
  background: #f7f7f7;
  margin-bottom: 15px;
`;

export const ChartsPanel: React.FC<Props> = ({ startBalance, movements }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const [state, setState] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setState({ width, height });
    }
  }, []);

  // line chart

  //  group by and sum amounts by same date
  const movementsGroupedByDay = groupBy(movements, m =>
    moment(m.date)
      .startOf("day")
      .toDate()
  );

  const byDayMovements: LineData = Object.keys(movementsGroupedByDay).map(day => {
    return [moment(day).toDate(), sumBy(movementsGroupedByDay[day], "amount")];
  });

  // init the first entry with start balance
  const data: LineData = byDayMovements.reverse().map((m, i) => {
    return [m[0], i === 0 ? m[1] + startBalance : m[1]];
  });

  // getting each point using data before
  const refinedData: LineData = data.map((d, i) => {
    const accumulatedValue = data.slice(0, i).reduce((prev, next) => prev + next[1], d[1]);
    return [d[0], accumulatedValue];
  });

  const onlyDates = refinedData.map(d => d[0]);
  const onlyValues = refinedData.map(d => d[1]);

  const xDomain = [min(onlyDates)!, max(onlyDates)!];
  const yDomain = [0, max(onlyValues)!];

  const xScale = scaleTime()
    .domain(xDomain)
    .range([0, state.width]);

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([state.height, 0]);

  const getLinePath = (data: LineData) =>
    line<Pair>()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(curveNatural)(data) || undefined;

  // pie chart

  const arcPath = arc<PieArcDatum<number>>();
  arcPath.innerRadius(0);
  arcPath.outerRadius(100);

  const movementType = Object.keys(MovementType);
  const blueScale = scaleOrdinal<string, string>()
    .domain(movementType)
    .range(Object.values(MovementInfoAndIcon).map(v => v.color));

  const pieData = movements.map(m => ({ type: m.type, value: Math.abs(m.amount) }));
  console.log(pieData);

  const arcs = pie<number>()(pieData.map(d => d.value));

  const wrapperHeight = 250;

  return (
    <SwipeableViews>
      <Wrapper height={wrapperHeight}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
          <g>
            <path d={getLinePath(refinedData)} stroke="#1f64d4" strokeWidth="4" fill="none" />
          </g>
        </svg>
      </Wrapper>
      <Wrapper height={wrapperHeight}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g transform={`translate(${state.width / 2}, ${state.height / 2})`}>
            {arcs.map((a, i) => (
              <path key={i} d={arcPath(a)!} fill={blueScale(pieData[i].type)} />
            ))}
          </g>
        </svg>
      </Wrapper>
    </SwipeableViews>
  );
};
