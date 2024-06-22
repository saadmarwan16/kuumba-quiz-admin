"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "../../components/logo";
import Search from "../../components/search";
import Avatar from "../../components/avatar";
import NewQuizButton from "../../components/new_quiz_button";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col gap-10">
      <section className="flex flex-col gap-4 sm:gap-6 md:gap-0">
        <header className="flex h-20 justify-between bg-background gap-8 z-10 items-center fixed w-full shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] px-5 sm:px-8 md:px-12 lg:px-16">
          <Logo />
          <Search />
          <Avatar />
        </header>

        <Search small />
      </section>

      <section className="flex flex-col items-start gap-4 sm:gap-6 md:gap-0 px-5 sm:px-8 md:px-12 lg:px-16">
        <NewQuizButton small />
        <Tabs value={path} className="w-full md:mt-24">
          <div className="flex gap-4 justify-between items-center">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger
                value={Routes.ALL}
                onClick={() => router.push(Routes.ALL)}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value={Routes.PUBLISHED}
                onClick={() => router.push(Routes.PUBLISHED)}
              >
                Published
              </TabsTrigger>
              <TabsTrigger
                value={Routes.UNPUBLISHED}
                onClick={() => router.push(Routes.UNPUBLISHED)}
              >
                Unpublished
              </TabsTrigger>
            </TabsList>

            <NewQuizButton />
          </div>

          <div className="mt-8 md:mt-10">{children}</div>
        </Tabs>
      </section>
    </main>
  );
};

export default Layout;
