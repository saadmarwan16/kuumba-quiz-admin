"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewQuizButton from "../../components/new_quiz_button";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <>
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
    </>
  );
};

export default Layout;
