import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

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

export const getUserInfoFromToken = (token) => {
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken) {
        return null;
    }

    const user = decodedToken.payload;

    return user;
};

// export const verifyToken = (token) => {
//     const privateKey = getSecretKey();
//     const decoded = jwt.verify(token, privateKey);
//     return decoded;
// };
