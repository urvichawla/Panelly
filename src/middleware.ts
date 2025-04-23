import { clerkMiddleware } from "@clerk/nextjs/server";

// This middleware protects all routes and handles the role selection page
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};