import type { Route } from "./+types/home";
import { redirect, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { auth } from "~/lib/auth";
import Loading from "~/components/Loading";
import DriveNavigator from "~/components/DriveNavigator";
import type { User } from "../../generated/prisma/client";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Odin File Uploader" },
    { name: "description", content: "Odin File Uploader" },
  ];
}

export const loader = async ({ context, request }: Route.LoaderArgs) => {
  const session = await auth.api.getSession({
    headers: request.headers
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = session?.user;
  return { user };
};

export const Home = ({ loaderData }: Route.ComponentProps) => {
  const [loading, setLoading] = useState(false);

  const { user } = loaderData;
  const navigate = useNavigate();

  if (loading) return (
    <div className="flex justify-center">
      <Loading />
    </div>
  );
  return (
    <div className="self-start flex flex-col px-4 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold">Welcome {user?.name}</h1>
      <DriveNavigator user={user as User} />
    </div>
  );
};

export default Home;