"use server";

import { INSERT_QUIZ_SUCCESS_MESSAGE } from "@/lib/literals";
import { createCustomServerClient } from "@/lib/supabase/server";
import { InsertQuizSchema } from "@/lib/types/quiz";
import { uuid } from "@/lib/uuid";
import { validateActionFields } from "@/lib/validate-action-fields";

export const insertQuiz = async (_: any, form: FormData) => {
  const { success, error, data } = validateActionFields(form, InsertQuizSchema);
  if (!success) {
    return {
      validationError: error,
    };
  }

  try {
    const supabase = createCustomServerClient();
    const { data: image, error: imageUploadError } = await supabase.storage
      .from("covers")
      .upload(`${uuid()}-${data.cover.name}`, data.cover);
    if (imageUploadError) throw imageUploadError;

    const baseUrl = "http://127.0.0.1:54321/storage/v1/object/public/";
    const { error } = await supabase
      .from("quizzes")
      .insert([
        {
          ...data,
          cover: `${baseUrl}${image.fullPath}`,
        },
      ]);

    if (error) throw error;

    return {
      data: INSERT_QUIZ_SUCCESS_MESSAGE,
    };
  } catch (e) {
    // Log the error to a logging service
    return {
      serverError: "Something went wrong. Please try again later.",
    };
  }
};
