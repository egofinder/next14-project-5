import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const AuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.includes(route)
  );

  if (!isLoggedIn && AuthRoute) {
    return Response.redirect(new URL("/", req.url));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
