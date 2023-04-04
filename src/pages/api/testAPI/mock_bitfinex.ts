import { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
    const { query: { pair } } = req;
    const BTCUSD = 4000
  
    try {  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify([["tBTCUSD",BTCUSD,16.4791866,27910,16.21850276,105,0.0037763,27910,2502.71030228,28500,27213]]));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end('Error fetching mock data');
    }
  };