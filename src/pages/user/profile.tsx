import { getSession } from "next-auth/client";
import Profile from "~/components/User/Profile";
import prisma from "~/lib/prisma";

interface Props {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  image: string;
}

const ProfilePage = ({
  firstname,
  lastname,
  email,
  username,
  image,
}: Props) => {
  return (
    <div>
      <Profile
        firstname={firstname}
        lastname={lastname}
        email={email}
        username={username}
        image={image}
      />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  const user = await prisma.user.findFirst({
    where: {
      id: session.id,
    },
  });

  if (user) {
    return {
      props: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        image: user.image,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}

export default ProfilePage;
