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
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryption: true,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
  callbacks: {
    async jwt(token, user) {
      console.log(token);
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
      console.log(token);
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
