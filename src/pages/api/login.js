import { login } from "@lib/mongo/user.controller";
import { validate } from "@lib/validation";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { email, password } = req.body;
            validate({ email, password });

            const token = await login(email, password);
            return res.json({ token });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
