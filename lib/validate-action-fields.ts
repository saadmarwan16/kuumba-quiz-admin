import { ZodSchema } from "zod";

export const validateActionFields = <T>(
  form: FormData,
  schema: ZodSchema<T>
) => {
  const res = schema.safeParse(Object.fromEntries(form));

  return {
    ...res,
    error: res.error?.flatten(),
  };
};
