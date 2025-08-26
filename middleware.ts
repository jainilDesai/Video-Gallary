import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        )
          return true;

        if (pathname === "/" || pathname.startsWith("/api/videos")) return true;

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // don't need "public/"
};

// export const config = {
//   /*
//    * Match all request paths except"
//    * - _next/static (static files)
//    * - _next/image (image optimization files)
//    * - public folder
//    */
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
// };
