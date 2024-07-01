import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../types/supabase";
import { env } from "../env";

export function createCustomBrowserClient() {
  return createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}
