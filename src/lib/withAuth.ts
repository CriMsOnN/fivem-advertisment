import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function withAuth(handler, roles: string[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = cookie.parse(req.headers.cookie);
    const authHeader =
      cookies["next-auth.session-token"] ||
      cookies["__Secure-next-auth.session-token"];
    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const token = authHeader;
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    if (roles.includes(decodedToken.role)) {
      return handler(req, res);
    } else {
      return res.status(401).json({ message: "Not authorized" });
    }
  };
}
