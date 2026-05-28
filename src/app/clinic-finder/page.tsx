import { cookies } from "next/headers";
import { ClinicFinderClient } from "@/components/clinic/ClinicFinderClient";

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ClinicFinderPage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("phila-lang")?.value;
  const lang = cookieLang === "af" || cookieLang === "xh" ? cookieLang : "en";
  const sp = await searchParams;
  const initialType = sp.type === "pharmacy" ? "pharmacy" : "medical";
  return <ClinicFinderClient lang={lang} initialType={initialType} />;
}