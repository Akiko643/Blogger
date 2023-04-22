import { verifyToken } from "@lib/authSession";
// import connectMongo from "@lib/mongo";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    const { pathname } = req.nextUrl;
    console.log("pathname: ", pathname);
    // await connectMongo();

    // console.log("just noob! ");
    let token = req.cookies.get("user-token")?.value;
    console.log("token", token && 1);
    // const verifiedToken = token && verifyToken(token);
    const verifiedToken = false;
    if (req.nextUrl.pathname.startsWith("/api")) {
        console.log("req", req);
        console.log("at least I'm here!!");
        return;
    }
    if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
        return;
    }
    if (req.nextUrl.pathname.startsWith("/login") && verifiedToken) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
