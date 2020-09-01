import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const client = new MongoClient(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
  },
);

(async () => {
  await client.connect();

  process.on('SIGINT', () => {
    client.close().then(() => {
      console.info('SIGINT received: DB connection is closing');
      process.exit(0);
    });
  });
})();

export default client;
