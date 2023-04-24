import jwt from "jsonwebtoken";

const getSecretKey = () => {
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
