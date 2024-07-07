import { Database } from "./supabase";

export type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];

export type Question = Database['public']['Tables']['questions']['Row'];
