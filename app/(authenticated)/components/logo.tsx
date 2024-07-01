import Link from "next/link";
import { FunctionComponent } from "react";
import Image from "next/image";
import { Routes } from "@/lib/routes";

interface LogoProps {}

const Logo: FunctionComponent<LogoProps> = () => {
  return (
    <Link
      href={Routes.ALL}
      className="block relative w-12 lg:w-16 aspect-square xl:w-40 xl:aspect-[7/2]"
    >
      <Image src="/logo-small.png" alt="Logo" className="xl:hidden" fill />
      <Image
        src="/logo-large.png"
        alt="Logo"
        fill
        className="hidden xl:inline-block"
      />
    </Link>
  );
};

export default Logo;
