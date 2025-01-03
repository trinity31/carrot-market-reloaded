import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean;
}
// hash map of public only urls
const publicOnlyUrls: Routes = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/create-account": true,
    "/github/start": true,
    "/github/complete": true,
};

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname];
    if (!session.id) { // if user is not logged in
        if (!exists) { // if the url is not one of public only urls
            return NextResponse.redirect(new URL("/", request.url)); // redirect to home page
        }
    } else { // if user is logged in
        if(exists) { // if the url is one of public only urls   
            return NextResponse.redirect(new URL("/products", request.url)); // redirect to products page
        }
    }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}