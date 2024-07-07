import { z } from "zod";
import { QuestionSchema } from "./question";

export const QuizSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Name must contain at least 2 characters"),
  author: z.string().min(2, "Author name must contain at least 2 characters"),
  cover: z.string().url("Invalid url"),
  published: z.boolean({
    required_error: "Published status is required",
    coerce: true,
  }).nullable(),
});

export const InsertQuizSchema = QuizSchema.omit({
  id: true,
  published: true,
}).merge(
  z.object({
    cover: z.custom<File>(
      (file) =>
        typeof file === "object" &&
        file instanceof File &&
        file.size !== 0 &&
        file.type.startsWith("image/")
    ),
  })
);

export const UpdateQuizSchema = QuizSchema.merge(
  z.object({
    cover: z.custom<File>(
      (file) => typeof file === "object" && file instanceof File
    ),
  })
);

export const DeleteQuizSchema = QuizSchema.pick({ id: true });

export const QuizWithQuestionSchema = QuizSchema.merge(
  z.object({ questions: z.array(QuestionSchema) })
);

export type TQuiz = z.infer<typeof QuizSchema>;

export type TInsertQuiz = z.infer<typeof InsertQuizSchema>;

export type TUpdateQuiz = z.infer<typeof UpdateQuizSchema>;

export type TDeleteQuiz = z.infer<typeof DeleteQuizSchema>;

export type TQuizWithQuestion = z.infer<typeof QuizWithQuestionSchema>;
