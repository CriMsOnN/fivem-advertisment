import { ReactNode } from "react";
import Head from "next/head";
import Header from "~/components/Header/Header";

interface Props {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = "Welcome to Greek Fivem" }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
