import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }

    const client = new MongoClient(uri, options);

    cachedClient = await client.connect();
    console.log("connected once!");
    return client;
}

export async function getClient() {
    const client = await connectToDatabase();
    return client;
}

export async function closeConnection() {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
    }
}
