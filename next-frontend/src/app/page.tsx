import { redirect } from "next/navigation";

export default function Home() {
  // Redirecionar para a página de autenticação
  redirect("/login");
}
