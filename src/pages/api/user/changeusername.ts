import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (!session) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      username: req.body,
    },
  });

  if (user) {
    res.status(404).json({ message: "Username already exists" });
    return;
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      username: req.body,
    },
  });

  session.username = req.body;

  res.status(200).json({ message: "Username changed!" });
};

export default handler;
