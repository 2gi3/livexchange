import { handleMockGetRequest } from '@/functions';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const BTCUSD = 4000;
  const data = [["tBTCUSD",BTCUSD,16.4791866,27910,16.21850276,105,0.0037763,27910,2502.71030228,28500,27213]];
  return handleMockGetRequest(data,500,res )
};
