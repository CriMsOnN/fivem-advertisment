import { PrismaClient } from "@prisma/client";
import Container from "~/components/Container/Container";
import Header from "~/components/Header/Header";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Streamers from "~/components/Streamers/Streamers";
export default function Home() {
  return (
    <div>
      <Container />
      {/* <Streamers /> */}
    </div>
  );
}
