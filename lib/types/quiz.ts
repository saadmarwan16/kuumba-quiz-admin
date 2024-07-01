import { z } from "zod";

export const QuizSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Name must contain at least 2 characters"),
  author: z.string().min(2, "Author name must contain at least 2 characters"),
  cover: z.custom<File>(
    (file) =>
      typeof file === "object" &&
      file instanceof File &&
      file.size !== 0 &&
      file.type.startsWith("image/")
  ),
  // published: z.boolean(),
});

export const InsertQuizSchema = QuizSchema.omit({ id: true });

export const DeleteQuizSchema = QuizSchema.pick({ id: true });

export type TQuiz = z.infer<typeof QuizSchema>;

export type TInsertQuiz = z.infer<typeof InsertQuizSchema>;

export type TDeleteQuiz = z.infer<typeof DeleteQuizSchema>;
