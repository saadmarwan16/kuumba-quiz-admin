import { FunctionComponent } from "react";
import Logo from "../(authenticated)/components/logo";

interface HeaderProps {}

export const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className="flex basis-20 bg-background items-center shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] px-5 sm:px-8 md:px-12 lg:px-16">
      <Logo />
    </header>
  );
};
