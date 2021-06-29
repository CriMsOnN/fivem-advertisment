import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { comparePassword } from "~/lib/passwordHandler";
import * as jwt from "jsonwebtoken";

interface credentialsProps {
  username: string;
  password: string;
}

const configuration = {
  sessions: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const jwtClaims = {
        username: token.username,
        email: token.email,
        user_id: token.id,
        role: token.role,
      };
      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
      return encodedToken;
    },
    decode: async ({ secret, token, maxAge }) => {
      const decodedToken: any = jwt.verify(token, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken;
    },
  },
  callbacks: {
    async jwt(token, user) {
      if (user?.userID) {
        token.id = user.userID;
      }
      if (user?.email) {
        token.email = user.email;
      }
      if (user?.username) {
        const result = await prisma.user.findUnique({
          where: {
            email: user?.email,
          },
        });
        token.username = result.username;
      }

      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },

    async session(session, token) {
      session.userID = token.id;
      session.email = token.email;
      const result = await prisma.user.findUnique({
        where: {
          email: session.email,
        },
      });
      session.username = result.username;
      session.role = token.role;
      session.token = jwt.sign(token, process.env.JWT_SECRET, {
        algorithm: "HS256",
      });

      return session;
    },
  },
  providers: [
    Providers.Credentials({
      id: "credentials",
      name: "Login",
      async authorize(credentials: credentialsProps) {
        const userDetails = {
          username: credentials.username,
          password: credentials.password,
        };
        const user = await prisma.user.findUnique({
          where: {
            username: userDetails.username,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await comparePassword(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          email: user.email,
          userID: user.id,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, configuration);
