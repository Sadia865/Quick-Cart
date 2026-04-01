import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/all-products",
    "/product/(.*)",
    "/api/product",
    "/api/inngest",
    "/api/clerk/webhook",
]);

const isSellerRoute = createRouteMatcher(["/seller(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    if (isSellerRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};