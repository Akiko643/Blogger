import { addView, deletePost, getPost } from "@lib/mongo/data.controller";
import { validate } from "@lib/validation";

export default async function handler(req, res) {
    try {
        const { id } = req.query;
        validate(id);
        if (req.method === "GET") {
            const post = await getPost(id);
            return res.json({ post });
        }
        if (req.method === "PATCH") {
            const post = await addView(id);
            return res.json({ post });
        }
        if (req.method === "DELETE") {
            const response = await deletePost(id);
            return res.json(response);
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
