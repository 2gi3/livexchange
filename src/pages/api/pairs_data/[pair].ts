import { LineGraphData } from '../../../types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<LineGraphData>) => {
    const { query: { pair } } = req;
  
    try {
      const raw = await fetch(`https://www.bitstamp.net/api/v2/ticker/${pair}`);
      const data = await raw.json();
      const obj = {
        timestamp: data.timestamp,
        last: data.last,
      };
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(obj));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end('Error fetching data');
    }
  };
  


  

