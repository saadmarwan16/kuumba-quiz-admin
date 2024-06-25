import { FunctionComponent } from "react";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Routes } from "@/lib/routes";
import NewQuizButton from "../../components/new_quiz_button";
import { IoMdAdd } from "react-icons/io";
import { createCustomServerClient } from "@/lib/supabase/server";

interface AllQuizzesProps {}

const AllQuizzes: FunctionComponent<AllQuizzesProps> = async () => {
  const supabase = createCustomServerClient();

  let { data: quiz, error } = await supabase.from("quiz").select("*");
  console.log("Quizzes:", quiz);
  console.log("Error:", error);

  return (
    <TabsContent value={Routes.ALL}>
      {/* <section className="flex flex-col items-center gap-2 py-24 sm:py-28  md:py-32 text-center">
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="h3">Something went wrong.</Typography>
        <Typography variant="p" affects="removePMargin">
          No quizzes found. Try creating one.
        </Typography>
        <Link
          href={Routes.NEW_QUIZ}
          className={buttonVariants()}
        >
          <IoMdAdd className="mr-2 h-6 w-6" />
          Add New Quiz
        </Link>
      </section> */}
      <div className="mb-10 md:mb-12 lg:mb-16 flex flex-col gap-8">
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

        <Button className="md:w-fit md:self-end">Load More</Button>
      </div>
    </TabsContent>
  );
};

export default AllQuizzes;
