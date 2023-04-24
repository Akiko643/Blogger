import { verifyToken } from "@lib/joseAuth";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
const isAuthPage = (pathname) => {
    if (pathname.startsWith("/login") || pathname.startsWith("/signUp")) {
        return true;
    }
    return false;
};

const isAdminRoute = (pathname) => {
    if (pathname.startsWith("/admin")) {
        return true;
    }
    return false;
};

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    console.log(pathname);
    let token = req.cookies.get("user-token")?.value;
    const verifiedToken = token && (await verifyToken(token));
    if (
        isAdminRoute(pathname) &&
        (!verifiedToken || verifiedToken?.role !== "admin")
    ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }
    if (isAuthPage(pathname) && !verifiedToken) {
        return NextResponse.next();
    }
    if (isAuthPage(pathname) && verifiedToken) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (pathname === "/") {
        return NextResponse.rewrite(new URL("/posts/normalUser", req.url));
    }
    if (pathname === "/admin") {
        return NextResponse.rewrite(new URL("/posts/admin", req.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
