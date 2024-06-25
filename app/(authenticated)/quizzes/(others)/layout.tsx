import { FunctionComponent, PropsWithChildren } from "react";

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return <div className="sm:mt-10 md:mt-10 sm:py-8 md:py-10 w-full">{children}</div>;
};

export default Layout;
