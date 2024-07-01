import { FunctionComponent } from "react";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Routes } from "@/lib/routes";
import { createCustomServerClient } from "@/lib/supabase/server";
import { IoMdAdd } from "react-icons/io";

interface PublishedQuizzesProps {}

const PublishedQuizzes: FunctionComponent<PublishedQuizzesProps> = async () => {
  const supabase = createCustomServerClient();
  const { data: quizzes, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("published", true);
  if (error) throw error;

  return (
    <TabsContent value={Routes.PUBLISHED}>
      {quizzes.length === 0 ? (
        <section className="flex flex-col items-center gap-2 py-24 sm:py-28  md:py-32 text-center">
          <Typography variant="h1">Oops!</Typography>
          <Typography variant="h3">Something went wrong.</Typography>
          <Typography variant="p" affects="removePMargin">
            No quizzes found. Try creating one.
          </Typography>
          <Link href={Routes.NEW_QUIZ} className={buttonVariants()}>
            <IoMdAdd className="mr-2 h-6 w-6" />
            Add New Quiz
          </Link>
        </section>
      ) : (
        <div className="mb-10 md:mb-12 lg:mb-16 flex flex-col gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {quizzes.map((quiz) => (
              <Link
                href={`/quizzes/${quiz.id}`}
                key={quiz.id}
                className="flex flex-col gap-4"
              >
                <div className="relative aspect-[9/16]">
                  <Image
                    src={quiz.cover}
                    alt={quiz.name}
                    className="rounded-lg"
                    fill
                  />
                </div>

                <div className="flex flex-col">
                  <Typography
                    variant="p"
                    className="text-base font-semibold truncate"
                  >
                    {quiz.name}
                  </Typography>
                  <Typography
                    variant="p"
                    affects="muted"
                    className="!leading-5 !mt-0 truncate"
                  >
                    {quiz.author}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>

          <Button className="md:w-fit md:self-end">Load More</Button>
        </div>
      )}
    </TabsContent>
  );
};

export default PublishedQuizzes;
