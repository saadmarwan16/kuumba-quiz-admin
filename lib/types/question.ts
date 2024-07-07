import z from "zod";

export const QuestionSchema = z.object({
  id: z.number().positive(),
  question_number: z.number().positive(),
  question: z.string(),
  options: z.array(z.string()),
  answer: z.string(),
  quiz_id: z.string().uuid(),
});

export const InsertQuestionSchema = QuestionSchema.omit({ id: true });

export const DeleteQuestionSchema = QuestionSchema.pick({ id: true });

export const QuestionOutputSchema = z
  .array(
    z.object({
      question: z.string().describe("The question"),
      options: z.array(z.string()).describe("The options"),
      answer: z.string().describe("The answer"),
    })
  )
  .describe("A list of the multiple choice questions");

export type TQuestion = z.infer<typeof QuestionSchema>;

export type TInsertQuestion = z.infer<typeof InsertQuestionSchema>;

export type TDeleteQuestion = z.infer<typeof DeleteQuestionSchema>;

export type TQuestionOutput = z.infer<typeof QuestionOutputSchema>;
