import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../types/supabase";

export function createCustomBrowserClient() {
  return createBrowserClient<Database>(
    env.SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}