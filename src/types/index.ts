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
  }

  export type Last = Pick<TickerData, 'last'>;

  export type BTCtoOthers = {
    [key: string]: Pick<TickerData, 'last'>;
  }
  
   