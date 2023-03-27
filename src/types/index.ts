import { Selection } from "d3";

export type Buttons = string[]

export interface TickerData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  last: number;
  volume: number;
  vwap: number;
  bid: number;
  ask: number;
  open_24: number;
  percent_change_24: number;
  pair: string
  }

  export type Last = Pick<TickerData, 'last'>;

  export type BTCtoOthers = {
    [key: string]: Pick<TickerData, 'last'>;
  }
  
  export type AverageTicketValueProp={
    average: number | string
  }

export interface BiggestMoversChartProps {
  biggestMovers: {
    pair: string;
    percent_change_24: number;
  }[];
}

export interface PairContextType {
  secectedPair: string;
  setSelectedPAir: React.Dispatch<React.SetStateAction<string>>;
}

export type KeyValueDisplayerProps = {
  objectKey: string;
  value: number;
}

export type LineGraphData = {
  timestamp: string;
  last: string;
}

export type FormattedLineGraphData ={ timestamp: string;
  last: string; }

export type FetcherArgs = [RequestInfo, RequestInit?];

export type D3SVGElement = Selection<SVGGElement, unknown, null, undefined>
