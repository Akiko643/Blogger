import jwt from "jsonwebtoken";
import crypto from "crypto";

export const hash = (password) => {
    const passwordHash = crypto.createHash("sha256");
    passwordHash.update(password);
    return passwordHash.digest("hex");
};

export const getSecretKey = () => {
    const secret = process.env.PRIVATE_KEY;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable PRIVATE_KEY is not set.");
    }

    return secret;
};

export const generateToken = (user) => {
    const { passwordHash: pass, ...payload } = user;
    const privateKey = getSecretKey();

    const token = jwt.sign(payload, privateKey, {
        expiresIn: "30d",
    });
    return token;
};

export const verifyToken = (token) => {
    console.log("my token", token);
    const privateKey = getSecretKey();
    const decoded = jwt.verify(token, privateKey);
    return decoded;
};
