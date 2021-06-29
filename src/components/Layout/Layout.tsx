import { ReactNode } from "react";
import Head from "next/head";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import { ToastProvider } from "react-toast-notifications";
interface Props {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = "Welcome to Greek Fivem" }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
