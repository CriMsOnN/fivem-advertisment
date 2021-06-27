import { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";

import { hashPassword } from "~/lib/passwordHandler";

interface userData {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed!" });
    return;
  }
  const userDetails: userData = req.body;
  const usernameHandle = await prisma.user.findUnique({
    where: {
      username: userDetails.username,
    },
  });

  if (usernameHandle) {
    res.status(422).json({ message: "User already exists" });
  } else {
    const emailHandle = await prisma.user.findUnique({
      where: {
        email: userDetails.email,
      },
    });
    if (emailHandle) {
      res.status(422).json({ message: "User already exists" });
    } else {
      const hashedPassword = await hashPassword(userDetails.password);
      await prisma.user.create({
        data: {
          username: userDetails.username,
          email: userDetails.email,
          firstname: userDetails.firstname,
          lastname: userDetails.lastname,
          hashedPassword: hashedPassword,
        },
      });
      res.status(200).json({ user: userDetails.username });
    }
  }
};

export default handler;
