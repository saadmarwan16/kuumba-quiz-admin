"use client";

import { FunctionComponent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import Typography from "@/components/ui/typography";
import {
  deleteQuiz,
  generateNewQuestions,
  generateQuestions,
  updateQuiz,
} from "./actions";
import { useFormState } from "react-dom";
import {
  DELETE_QUIZ_SUCCESS_MESSAGE,
  UPDATE_QUIZ_SUCCESS_MESSAGE,
} from "@/lib/literals";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdAdd } from "react-icons/io";
import { TQuizWithQuestion } from "@/lib/types/quiz";

interface UploadImageProps {
  defaultCover: string;
}

export const UploadImage: FunctionComponent<UploadImageProps> = ({
  defaultCover,
}) => {
  const [image, setImage] = useState(defaultCover);

  return (
    <div className="flex flex-col gap-4 max-w-52 md:grow">
      <AspectRatio ratio={9 / 16} className="bg-muted">
        <Image
          src={image}
          alt="cover of the book to be inserted"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
      <Input
        id="cover"
        name="cover"
        defaultValue={undefined}
        type="file"
        className="hidden"
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0)
            setImage(URL.createObjectURL(event.target.files[0]));
        }}
      />
      <label
        htmlFor="cover"
        className={buttonVariants({
          variant: "outline",
        })}
      >
        Update Cover
      </label>
    </div>
  );
};

interface DeleteQuizButtonProps {
  id: string;
}

export const DeleteQuizButton: FunctionComponent<DeleteQuizButtonProps> = ({
  id,
}) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      type="button"
      disabled={pending}
      className="grow"
      onClick={async () => {
        setPending(true);
        const res = await deleteQuiz({ id });
        setPending(false);
        if (res.data && res.data === DELETE_QUIZ_SUCCESS_MESSAGE) {
          router.refresh();
          router.push(Routes.ALL);
        }
      }}
    >
      Delete Quiz
    </Button>
  );
};

export const UpdateQuizButton: FunctionComponent = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="grow">
      Update Quiz
    </Button>
  );
};

interface GenerateQuestionsProps {
  name: string;
  quiz_id: string;
}

export const GenerateQuestions: FunctionComponent<GenerateQuestionsProps> = ({
  name,
  quiz_id,
}) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <Button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        await generateQuestions(name, quiz_id);
        setPending(false);
        router.refresh();
      }}
    >
      <IoMdAdd className="mr-2 h-6 w-6" />
      Generate Questions
    </Button>
  );
};

interface GenerateNewQuestionsProps {
  name: string;
  quiz_id: string;
}

const GenerateNewQuestions: FunctionComponent<GenerateNewQuestionsProps> = ({
  name,
  quiz_id,
}) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <Button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        await generateNewQuestions(name, quiz_id);
        setPending(false);
        router.refresh();
      }}
    >
      Generate New Questions
    </Button>
  );
};

export default GenerateNewQuestions;

interface UpdateQuizFormProps {
  data: TQuizWithQuestion;
}

export const UpdateQuizForm: FunctionComponent<UpdateQuizFormProps> = ({
  data,
}) => {
  const form = useRef<HTMLFormElement | null>(null);
  const [state, action] = useFormState(updateQuiz, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.data && state.data === UPDATE_QUIZ_SUCCESS_MESSAGE) {
      router.refresh();
      router.push(Routes.ALL);
    }
  }, [router, state]);

  return (
    <form ref={form} action={action} className="flex flex-col gap-9">
      <Typography variant="h3">Add New Quiz</Typography>
      <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-12 grow md:items-start">
        <div className="flex flex-col justify-center items-center gap-6 md:grow lg:max-w-[600px]">
          <input name="id" value={data.id} type="hidden" />
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={data.name}
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
              defaultValue={data.author}
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

        <div className="flex flex-col gap-8 grow">
          <UploadImage defaultCover={data.cover} />

          <div className="flex items-center gap-2">
            <Checkbox
              id="published"
              name="published"
              defaultChecked={data.published ?? undefined}
            />
            <label
              htmlFor="published"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as published
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center self-stretch">
          <Typography variant="h4">Questions</Typography>
          <GenerateNewQuestions name={data.name} quiz_id={data.id} />
        </div>

        {data.questions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-24 sm:py-28  md:py-32 text-center">
            <Typography variant="h1">Oops!</Typography>
            <Typography variant="h3">Something went wrong.</Typography>
            <Typography variant="p" affects="removePMargin">
              No questions found. Try generating some.
            </Typography>
            <GenerateQuestions name={data.name} quiz_id={data.id} />
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {data.questions.map((question) => (
              <AccordionItem
                key={question.id}
                value={`Question ${question.question_number}`}
              >
                <AccordionTrigger>{question.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    {question.options.map((option, idx) => (
                      <Typography
                        key={idx}
                        variant="p"
                        affects="small"
                        className={`!mt-0 ${
                          option === question.answer
                            ? "text-[#188351]"
                            : "text-[#EC4034]"
                        }`}
                      >
                        {option}
                      </Typography>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
      <div className="self-stretch flex flex-col gap-3 sm:flex-row sm:gap-6 max-w-[640px]">
        <DeleteQuizButton id={data.id} />
        <UpdateQuizButton />
      </div>
    </form>
  );
};
