import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, InfoIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  "use server";
  const apiKey = formData.get("apiKey");

  console.log("API Key:", apiKey);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
    headers: {
      "X-API-KEY": apiKey as string,
    },
  });

  if (!response.ok) {
    throw new Error("Invalid API Key");
  }

  const cookiesStore = await cookies();
  cookiesStore.set("apiKey", apiKey as string);

  redirect("/invoices");
}

export async function AuthForm() {
  const cookiesStore = await cookies();
  const isAuthPage = cookiesStore.get("apiKey")?.value !== undefined;
  if (isAuthPage) {
    redirect("/invoices");
  }

  return (
    <form className="space-y-4" action={loginAction}>
      <div className="space-y-2">
        <label htmlFor="apiKey" className="text-sm font-medium text-gray-300">
          API Key
        </label>
        <div className="flex gap-2">
          <Input
            id="apiKey"
            name="apiKey"
            placeholder="Digite sua API Key"
            className="bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
          />
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      <div className="bg-[#2a3343] p-4 rounded-lg border border-gray-700">
        <div className="flex gap-2 items-start">
          <InfoIcon className="text-blue-400 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-blue-400 mb-1">
              Como obter uma API Key?
            </h3>
            <p className="text-sm text-gray-400">
              Para obter sua API Key, você precisa criar uma conta de
              comerciante. Entre em contato com nosso suporte para mais
              informações.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
