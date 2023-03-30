import { FetcherArgs, TickerData, UnformattedTickerData } from "@/types"

export   const calculateAverageLast = (
    a?: number | null,
    b?: number | null,
    c?: number | null
  ): number | string => {
    let array = []
    typeof a === 'number' ? array.push(a) : null
    typeof b === 'number' ? array.push(b) : null
    typeof c === 'number' ? array.push(c) : null
    const sum = array.reduce((a, b) => a + b, 0)
    const average = sum / array.length
    if (array.length > 0) {
      return Number(average.toFixed(2))
    } else {
      return 'Data not available at this time'
    }
  }

  export const formatTimestamp = (timestamp: number): string => {
    if(timestamp === 0){
      return 'Timestamp not available'
    }
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleString("en-GB");
    return formattedDate;
  };

  export const fetcherLineGraph = async (...args: FetcherArgs) => {
    const response = await fetch(...args).then((res) => res.json());
    const timestamp = Number(response.timestamp);
    const last = parseFloat(response.last);  
    return {
      timestamp,
      last,
    };
  };


  //multiply the number of pixels used for the graph's bar's height by barScale, 
  //to make sure  that the bars are never too big or too small
  export const scaleBar = (biggestMover: number): number=>{
  const reference =  Math.abs(biggestMover)
  let barScale: number;

  if (reference > 65) {
    barScale = 1;
  } else if (reference >= 45 && biggestMover <= 65) {
    barScale = 2;
  } else if (reference >= 30 && biggestMover <= 45) {
    barScale = 3;
  } else if (reference >= 19 && biggestMover <= 30) {
    barScale = 4;
  } else if (reference >= 10 && biggestMover <= 19) {
    barScale = 7;
  } else {
    barScale = 12;
  }

  return barScale

  }

  export function mapValuesToNumber(obj: any) {
    return {
      ...obj,
      timestamp: Number(obj.timestamp),
      open: Number(obj.open),
      high: Number(obj.high),
      low: Number(obj.low),
      last: Number(obj.last),
      volume: Number(obj.volume),
      vwap: Number(obj.vwap),
      bid: Number(obj.bid),
      ask: Number(obj.ask),
      open_24: Number(obj.open_24),
      percent_change_24: Number(obj.percent_change_24),
    };
  }