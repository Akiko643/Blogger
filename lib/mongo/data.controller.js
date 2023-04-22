import clientPromise from "./index";

export const saveData = async (post, authorId) => {
    const client = await getClient();
    const db = client.db("blogger");
    const postData = { post, authorId };

    await db.collection("posts").insertOne(postData);
    const postInDB = await db.collection("posts").findOne(postData);
    return postInDB;
};
