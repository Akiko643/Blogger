import { createPost } from "@lib/mongo/data.controller";
import { validate } from "@lib/validation";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { content, authorId } = req.body;
            validate({ content, authorId });
            const postData = await createPost(content, authorId);
            return res.json({ post: postData });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
