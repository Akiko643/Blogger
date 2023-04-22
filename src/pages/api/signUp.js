import { signUp } from "@lib/mongo/user.controller";
import { validate } from "@lib/validation";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { email, password, passwordRepeat, role } = req.body;
            validate({ email, password, passwordRepeat, role });

            const user = await signUp(email, password, passwordRepeat, role);
            return res.json({ user });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
