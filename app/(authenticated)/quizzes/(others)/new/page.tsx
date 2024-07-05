"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typography from "@/components/ui/typography";
import { FunctionComponent, useEffect, useRef } from "react";
import { insertQuiz } from "./actions";
import { useFormState } from "react-dom";
import InsertQuizButton, { UploadImage } from "./components";
import { INSERT_QUIZ_SUCCESS_MESSAGE } from "@/lib/literals";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

const NewQuiz: FunctionComponent = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [state, action] = useFormState(insertQuiz, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.data && state.data === INSERT_QUIZ_SUCCESS_MESSAGE) {
      router.refresh();
      router.push(Routes.ALL);
    }
  }, [router, state]);

  return (
    <form ref={form} action={action} className="flex flex-col gap-9">
      <Typography variant="h3">Add New Quiz</Typography>
      <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-12 grow md:items-start">
        <div className="flex flex-col justify-center items-center gap-6 md:grow lg:max-w-[600px]">
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the name of the book here..."
            />
            {state?.validationError?.fieldErrors.name?.map((error, idx) => (
              <Label
                key={idx}
                htmlFor="name"
                className="text-sm font-light text-destructive"
              >
                {error}
              </Label>
            ))}
          </div>
          <div className="w-full">
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              id="author"
              name="author"
              placeholder="Enter the name of the author here..."
            />
            {state?.validationError?.fieldErrors.author?.map((error, idx) => (
              <Label
                key={idx}
                htmlFor="author"
                className="text-sm font-light text-destructive"
              >
                {error}
              </Label>
            ))}
          </div>
        </div>

        <UploadImage state={state} />
      </div>
      <InsertQuizButton />
    </form>
  );
};

export default NewQuiz;
