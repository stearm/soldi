import * as React from "react";
import moment from "moment";
import styled from "styled-components";
import { line, curveNatural, arc, pie, PieArcDatum } from "d3-shape";
import { scaleTime, scaleLinear, scaleOrdinal } from "d3-scale";
import { max, min } from "d3-array";
import SwipeableViews from "react-swipeable-views";
import { Movement } from "../types/Movement";
import { LineData, Pair } from "../types/Charts";
import { MovementType, MovementInfoAndIcon } from "../types/MovementType";

interface Props {
  balance: number;
  movements: Array<Movement>;
}

const Wrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => `${props.height}px`};
  border-radius: 10px;
  background: #f7f7f7;
  margin-bottom: 15px;
`;

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

export const ChartsPanel: React.FC<Props> = ({ balance, movements }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const [state, setState] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setState({ width, height });
    }
  }, []);

  // line chart

  const onlyDates = data.map(d => d[0]);
  const onlyValues = data.map(d => d[1]);

  const xDomain = [min(onlyDates)!, max(onlyDates)!];
  const yDomain = [min(onlyValues)!, max(onlyValues)!];

  const xScale = scaleTime()
    .domain(xDomain)
    .range([0, state.width]);

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([state.height, 0]);

  const getLinePath = (size: number, data: LineData) =>
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

  const pieData = [
    { type: MovementType.FOOD, value: 5 },
    { type: MovementType.FUEL, value: 8 },
    { type: MovementType.MUTUO, value: 13 },
    { type: MovementType.OTHER, value: 21 }
  ];

  const arcs = pie<number>()(pieData.map(d => d.value));

  const wrapperHeight = 250;

  return (
    <SwipeableViews>
      <Wrapper height={wrapperHeight}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
          <g>
            <path d={getLinePath(wrapperHeight, data)} stroke="#1f64d4" strokeWidth="4" fill="none" />
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
