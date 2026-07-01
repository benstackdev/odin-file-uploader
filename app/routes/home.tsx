import type { Route } from "./+types/home";;
import { redirect, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { auth } from "~/lib/auth";
import Loading from "~/components/Loading";

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
  const [loading, setLoading] = useState(true);

  const user = loaderData;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      setLoading(true);
      return;
    }
    setLoading(false);
  }, []);

  if (loading) return (
    <div className="flex justify-center">
      <Loading />
    </div>
  );
  return (
    <div className="">

    </div>
  );
};

export default Home;