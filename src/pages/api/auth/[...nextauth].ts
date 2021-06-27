import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { comparePassword } from "~/lib/passwordHandler";

interface credentialsProps {
  username: string;
  password: string;
}

const configuration = {
  sessions: {
    jwt: true,
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
        token.username = user.username;
      }

      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },

    async session(session, token) {
      session.userID = token.id;
      session.email = token.email;
      session.username = token.username;
      session.role = token.role;
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
