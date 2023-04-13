import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../mongoDB';
import Feedback from '../../../../mongoDB/models/feedback' 
import { TwilioMessage } from '@/types';


const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const virtualNumber = process.env.TWILIO_NUMBER;
const phoneNumber = process.env.MOBILE_NUMBER;
const client = require("twilio")(accountSid, authToken);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const { feedback, name, email } = req.body;
      const newFeedback = new Feedback({ feedback, name, email });
      await newFeedback.save();
      res.status(200).json({ message: 'Feedback saved successfully' });
      client.messages
  // .create({ body: `Feedback for liveXchange: ${feedback}`, from: virtualNumber, to: phoneNumber })
    // .then((message: TwilioMessage) => console.log(message));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving feedback' });
    }
  } else {
    res.status(404).json({ message: 'Invalid request method' });
  }
}
