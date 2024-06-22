"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FunctionComponent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import Search from "./components/search";
import Avatar from "./components/avatar";
import Logo from "./components/logo";
import NewQuizButton from "./components/new_quiz_button";

interface AuthenticatedProps {}

const Authenticated: FunctionComponent<AuthenticatedProps> = () => {
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
        <Tabs defaultValue="all" className="w-full md:mt-24">
          <div className="flex gap-4 justify-between items-center">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
            </TabsList>

            <NewQuizButton />
          </div>

          <div className="mt-8 md:mt-10 mb-10 md:mb-12 lg:mb-16 flex flex-col gap-8">
            <TabsContent value="all">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                  <Link
                    href={`/quizzes/${item + 1}`}
                    key={item}
                    className="flex flex-col gap-4"
                  >
                    <div className="relative aspect-[9/16]">
                      <Image
                        src="/img/rich_dad_poor_dad.jpg"
                        alt="Logo"
                        className="rounded-lg"
                        fill
                      />
                    </div>

                    <div className="flex flex-col">
                      <Typography
                        variant="p"
                        className="text-base font-semibold truncate"
                      >
                        Rich Dad Poor Dad Rich Dad Poor Dad
                      </Typography>
                      <Typography
                        variant="p"
                        affects="muted"
                        className="!leading-5 !mt-0 truncate"
                      >
                        Robert Kiyosaki Robert Kiyosaki
                      </Typography>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="published">
              <div>Hello, world from published!</div>
            </TabsContent>
            <TabsContent value="unpublished">
              <div>Hello, world from unpublished!</div>
            </TabsContent>

            <Button className="md:w-fit md:self-end">Load More</Button>
          </div>
        </Tabs>
      </section>
    </main>
  );
};

export default Authenticated;
