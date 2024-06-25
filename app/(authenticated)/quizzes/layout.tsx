import { FunctionComponent, PropsWithChildren } from "react";
import Logo from "../components/logo";
import Search from "../components/search";
import Avatar from "../components/avatar";

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col gap-7 sm:gap-10">
      <section className="flex flex-col gap-4 sm:gap-6 md:gap-0">
        <header className="flex h-20 justify-between bg-background gap-8 z-10 items-center fixed w-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] px-5 sm:px-8 md:px-12 lg:px-16">
          <Logo />
          <Search />
          <Avatar />
        </header>

        <Search small />
      </section>

      <section className="flex flex-col items-start gap-4 sm:gap-6 md:gap-0 px-5 sm:px-8 md:px-12 lg:px-16">
        {children}
      </section>
    </main>
  );
};

export default Layout;
