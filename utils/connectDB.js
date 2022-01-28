import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = await client.db(process.env.MONGODB_DB);

    return { client, db };
  } catch (err) {
    console.log(err);
  }
};
