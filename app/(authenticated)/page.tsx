"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FunctionComponent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdAdd } from "react-icons/io";
import Typography from "@/components/ui/typography";
import Link from "next/link";

interface AuthenticatedProps {}

const Authenticated: FunctionComponent<AuthenticatedProps> = () => {
  return (
    <main className="flex min-h-screen flex-col gap-10">
      <section className="flex flex-col gap-4 sm:gap-6 md:gap-0">
        <header className="flex h-20 justify-between items-center shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)] px-5 sm:px-8 md:px-12 lg:px-16">
          <Link href="/" className="block relative w-12 aspect-square">
            <Image src="/logo-small.png" alt="Logo" fill />
          </Link>
          <div className="relative w-12 aspect-square rounded-full">
            <Image
              src="/img/profile.jpg"
              alt="Logo"
              className="rounded-full"
              fill
            />
          </div>
        </header>

        <form className="px-5 sm:px-6 md:px-0 md:hidden">
          <Input type="text" placeholder="Search for a book here..." />
        </form>
      </section>

      <section className="flex flex-col items-start gap-4 sm:gap-6 md:gap-0 px-5 sm:px-8 md:px-12 lg:px-16">
        <Link
          href="/quizzes/new"
          className={`${buttonVariants()} self-stretch md:hidden`}
        >
          <IoMdAdd className="mr-2 h-6 w-6" />
          Add New Quiz
        </Link>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
          </TabsList>

          <div className="mt-8 md:mt-10 mb-10 md:mb-12 lg:mb-16 flex flex-col gap-8">
            <TabsContent value="all">
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex flex-col gap-4">
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
                  </div>
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
