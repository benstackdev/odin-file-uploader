import { headingStyle } from "~/styles/styleTemplates";
import type { Route } from "./+types/home";;
import { redirect, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { auth } from "~/lib/auth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Odin File Uploader" },
    { name: "description", content: "Odin File Uploader" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });

  if (session?.user) return session.user;
  else redirect("/sign-in");
};

export const Home = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData;
  if (!user) return <>User not defined</>;

  return (
    <>
      Welcome {user?.name}!
    </>
  );
};

export default Home;