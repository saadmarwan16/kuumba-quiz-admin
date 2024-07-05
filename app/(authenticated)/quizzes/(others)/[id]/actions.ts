"use server";

import {
  DELETE_QUIZ_SUCCESS_MESSAGE,
  UPDATE_QUIZ_SUCCESS_MESSAGE,
} from "@/lib/literals";
import { createCustomServerClient } from "@/lib/supabase/server";
import { DeleteQuizSchema, UpdateQuizSchema } from "@/lib/types/quiz";
import { uuid } from "@/lib/uuid";
import { validateActionFields } from "@/lib/validate-action-fields";

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
