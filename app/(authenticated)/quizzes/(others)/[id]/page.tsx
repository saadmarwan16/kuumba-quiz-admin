import { FunctionComponent } from "react";
import { UpdateQuizForm } from "./components";
import { createCustomServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface QuizDetailsProps {
  params: {
    id: string;
  };
}

const QuizDetails: FunctionComponent<QuizDetailsProps> = async ({
  params: { id },
}) => {
  const supabase = createCustomServerClient();
  const { data, error } = await supabase
    .from("quizzes")
    .select()
    .eq("id", id)
    .limit(1)
    .single();
  if (error) throw notFound();

  return <UpdateQuizForm data={data} />;
};

export default QuizDetails;
