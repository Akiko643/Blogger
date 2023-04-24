import { jwtVerify } from "jose";

const getSecretKey = () => {
    const secret = process.env.PRIVATE_KEY;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable PRIVATE_KEY is not set.");
    }

    return secret;
};

export const verifyToken = async (token, secretKey) => {
    try {
        console.log("secretKey", secretKey);
        if (secretKey) {
            const verified = await jwtVerify(
                token,
                new TextEncoder().encode(secretKey)
            );
            return verified.payload;
        } else {
            const privateKey = getSecretKey();
            const verified = await jwtVerify(
                token,
                new TextEncoder().encode(privateKey)
            );
            return verified.payload;
        }
    } catch (err) {
        throw new Error(`Error verifying token: ${err}`);
    }
};
