import { FetcherArgs } from "@/types"

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
  
    // const date = new Date(timestamp * 1000);
    // const formattedDate = date.toLocaleTimeString("it-IT");
  
    return {
      timestamp,
      last,
    };
  };