"use server";

import {
  DELETE_QUIZ_SUCCESS_MESSAGE,
  TEMPLATE,
  UPDATE_QUIZ_SUCCESS_MESSAGE,
} from "@/lib/literals";
import { createCustomServerClient } from "@/lib/supabase/server";
import { QuestionOutputSchema } from "@/lib/types/question";
import { DeleteQuizSchema, UpdateQuizSchema } from "@/lib/types/quiz";
import { uuid } from "@/lib/uuid";
import { validateActionFields } from "@/lib/validate-action-fields";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { model } from "@/lib/model";
import { revalidateTag } from "next/cache";

export const updateQuiz = async (_: any, form: FormData) => {
  const { success, error, data } = validateActionFields(form, UpdateQuizSchema);
  if (!success) {
    return {
      validationError: error,
    };
  }

  try {
    const supabase = createCustomServerClient();
    let cover: string | undefined = undefined;
    if (data.cover.size !== 0 && data.cover.type.startsWith("image/")) {
      const { data: image, error: imageUploadError } = await supabase.storage
        .from("covers")
        .upload(`${uuid()}-${data.cover.name}`, data.cover);
      if (imageUploadError) throw imageUploadError;

      const baseUrl = "http://127.0.0.1:54321/storage/v1/object/public/";
      cover = `${baseUrl}${image.fullPath}`;
    }

    const { id, ...val } = data;
    const { error } = await supabase
      .from("quizzes")
      .update({ ...val, cover })
      .eq("id", id);

    if (error) throw error;

    return {
      data: UPDATE_QUIZ_SUCCESS_MESSAGE,
    };
  } catch (e) {
    // Log the error to a logging service
    return {
      serverError: "Something went wrong. Please try again later.",
    };
  }
};

export const deleteQuiz = async (val: { id: string }) => {
  const { success, error, data } = DeleteQuizSchema.safeParse(val);
  if (!success) {
    return {
      validationError: error,
    };
  }

  try {
    const supabase = createCustomServerClient();
    const { error } = await supabase.from("quizzes").delete().eq("id", data.id);

    if (error) throw error;

    return {
      data: DELETE_QUIZ_SUCCESS_MESSAGE,
    };
  } catch (e) {
    // Log the error to a logging service
    return {
      serverError: "Something went wrong. Please try again later.",
    };
  }
};

export const generateQuestions = async (title: string, quiz_id: string) => {
  try {
    const parser = StructuredOutputParser.fromZodSchema(QuestionOutputSchema);
    const template = new PromptTemplate({
      inputVariables: ["numberOfQuestions", "title", "formatInstructions"],
      template: TEMPLATE,
    });
    const chain = RunnableSequence.from([template, model, parser]);
    const output = await chain.invoke({
      title,
      numberOfQuestions: 10,
      formatInstructions: parser.getFormatInstructions(),
    });

    const questions = output.map((question, idx) => ({
      ...question,
      question_number: idx + 1,
      quiz_id,
    }));

    const supabase = createCustomServerClient();
    const { error } = await supabase.from("questions").insert(questions);
    if (error) throw error;
  } catch (_) {
    // Log the error to a logging service
    return {
      serverError: "Something went wrong. Please try again later.",
    };
  }
};

export const generateNewQuestions = async (title: string, quiz_id: string) => {
  try {
    const parser = StructuredOutputParser.fromZodSchema(QuestionOutputSchema);
    const template = new PromptTemplate({
      inputVariables: ["numberOfQuestions", "title", "formatInstructions"],
      template: TEMPLATE,
    });
    const chain = RunnableSequence.from([template, model, parser]);
    const output = await chain.invoke({
      title,
      numberOfQuestions: 10,
      formatInstructions: parser.getFormatInstructions(),
    });

    const questions = output.map((question, idx) => ({
      ...question,
      question_number: idx + 1,
      quiz_id,
    }));

    const supabase = createCustomServerClient();
    const deleteQuestions = supabase
      .from("questions")
      .delete()
      .eq("quiz_id", quiz_id);
    const insertQuestion = supabase.from("questions").insert(questions);
    const res = await Promise.all([deleteQuestions, insertQuestion]);
    if (res[0].error) throw res[0].error;
    if (res[1].error) throw res[1].error;

    // const supabase = createCustomServerClient();
    // const { error: deleteError } = await supabase
    //   .from("questions")
    //   .delete()
    //   .eq("quiz_id", quiz_id);
    // if (deleteError) throw deleteError;

    // const { error } = await supabase.from("questions").insert(questions);
    // if (error) throw error;
  } catch (_) {
    // Log the error to a logging service
    return {
      serverError: "Something went wrong. Please try again later.",
    };
  }
};
