import { Avatar, Divider, Progress } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { CheckAuthProvider } from "@/utils/supabase/check-auth-provider";
import { ResultContainer } from "./result-conatiner";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: results } = await supabase
    .from("practice_results")
    .select("*, practice_sets(*)")
    // .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <>
      <CheckAuthProvider />
      <section className="py-8 flex flex-col justify-center items-center">
        <Avatar size="lg" className="mb-4" />
        <p>{user?.email}</p>
        <div className="w-full flex justify-center">
          <Progress
            size="lg"
            radius="sm"
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-sm rounded-full",
              indicator:
                "bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            label="EXP"
            value={65}
            showValueLabel={true}
          />
        </div>
      </section>
      <Divider />
      {results ? <ResultContainer results={results} /> : null}
    </>
  );
}
