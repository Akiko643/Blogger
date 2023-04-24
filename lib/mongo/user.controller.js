import { generateToken } from "@lib/authSession";
import { getClient } from "./index";
import crypto from "crypto";

export const hash = (password) => {
    const passwordHash = crypto.createHash("sha256");
    passwordHash.update(password);
    return passwordHash.digest("hex");
};

export const createUser = async (data) => {
    const client = await getClient();
    const db = client.db("blogger");

    const response = await db.collection("users").insertOne(data);
    return response;
};

export const findUser = async (filter) => {
    const client = await getClient();
    const db = client.db("blogger");

    const userInDb = await db.collection("users").findOne(filter);
    return userInDb;
};

// only for debug purposes
export const findAllUsers = async () => {
    const client = await getClient();
    const db = client.db("blogger");

    const userInDb = await db.collection("users").findOne();
    return userInDb;
};

export const login = async (email, password) => {
    const passwordHash = hash(password);
    const user = await findUser({ email, passwordHash });
    if (!user) {
        throw new Error("User not found");
    }
    const token = generateToken(user);
    return token;
};

export const signUp = async (email, password, passwordRepeat, role) => {
    if (password !== passwordRepeat) {
        throw new Error("Password does not match!");
    }

    const userInDb = await findUser({ email });

    if (userInDb) {
        throw new Error("Email already used!");
    }

    const passwordHash = hash(password);

    await createUser({ email, passwordHash, role });
    const user = await findUser({ email, passwordHash, role });

    const token = generateToken(user);
    return token;
};
