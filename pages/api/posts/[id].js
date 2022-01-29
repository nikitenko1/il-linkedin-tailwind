import { connectToDatabase } from '../../../utils/connectDB';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  if (method === 'DELETE') {
    try {
      await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'Success. The post has been deleted.' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
