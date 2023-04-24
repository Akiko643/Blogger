import { getPosts } from "@lib/mongo/data.controller";
import { validate } from "@lib/validation";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const posts = await getPosts({ approved: false });
            return res.json({ length: posts.length, posts });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
