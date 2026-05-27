import { cookies } from "next/headers";
import { isLang, type Lang } from "./lang";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const value = cookieStore.get("phila-lang")?.value;
  return isLang(value) ? value : "en";
}