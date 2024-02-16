import NextAuth from "next-auth";
import authConfig from "@/auth.config";
// const { auth } = NextAuth(authConfig);

import { auth } from "@/auth";
import { apiAuthPrefix, publicRoutes } from "@/routes";

export default auth((req) => {
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // if (isApiAuthRoute) {
  //   return null;
  // }
  // if (!isLoggedIn && !isPublicRoute) {
  // return Response.redirect("http://localhost:3000");
  // }
  // return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
