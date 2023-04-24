import { ObjectId } from "mongodb";
import { getClient } from "./index";

export const createPost = async (content, authorId) => {
    const client = await getClient();
    const db = client.db("blogger");
    const postData = { content, authorId, approved: false, viewCount: 0 };

    await db.collection("posts").insertOne(postData);
    const postInDB = await db.collection("posts").findOne(postData);
    return postInDB;
};

export const getPosts = async ({ approved }) => {
    const client = await getClient();
    const db = client.db("blogger");
    const posts = await db.collection("posts").find({ approved }).toArray();
    return posts;
};

export const getPost = async (id) => {
    const client = await getClient();
    const db = client.db("blogger");
    const post = await db
        .collection("posts")
        .findOne({ _id: new ObjectId(id) });
    return post;
};

export const updatePost = async (id, updateBody) => {
    const client = await getClient();
    const db = client.db("blogger");
    const post = await db.collection("posts").findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
            $set: updateBody,
        },
        { returnDocument: "after" }
    );
    return post.value;
};

export const addView = async (id) => {
    const post = await getPost(id);
    const { viewCount } = post;
    const updatedPost = await updatePost(id, { viewCount: viewCount + 1 });
    return updatedPost;
};
