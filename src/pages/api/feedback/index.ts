import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../mongoDB';
import Feedback from '../../../../mongoDB/models/feedback' 

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
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving feedback' });
    }
  } else {
    res.status(404).json({ message: 'Invalid request method' });
  }
}
