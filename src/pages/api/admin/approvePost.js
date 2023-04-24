import { approvePost, getPosts, updatePost } from "@lib/mongo/data.controller";
import { validate } from "@lib/validation";

export default async function handler(req, res) {
    try {
        if (req.method === "PATCH") {
            const { id } = req.query;
            validate({ id });
            const post = await updatePost(id, { approved: true });
            return res.json({ post });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
