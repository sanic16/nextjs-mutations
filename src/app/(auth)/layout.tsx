import { Metadata } from "next";
import "../globals.css";
import { logout } from "@/actions/auth";
import { getUser } from "@/utils/auth";
import AuthHeader from "@/components/auth/AuthHeader";
import { redirect } from "next/navigation";

const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión en la aplicación",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    return redirect("/auth");
  }

  return (
    <>
      {user?.id ? <AuthHeader user={user} logout={logout} /> : null}

      {user?.id ? children : <section>Debes iniciar sesión</section>}
    </>
  );
}
