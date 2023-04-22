import { saveData } from "@lib/mongo/data.controller";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { post, authorId } = req.body;
            // validate or not?
            const postData = await saveData(post, authorId);
            return res.json({ post: postData });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
