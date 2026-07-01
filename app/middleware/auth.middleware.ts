import { auth } from "~/lib/auth";
import userContext from "~/lib/userContext";
import type { User } from "../../generated/prisma/client";
import type { Route } from "../routes/+types/home";
import { redirect } from "react-router";

export const authMiddleware: Route.MiddlewareFunction = async ({ context, request }, next) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      console.log("No user?");
      // throw redirect("/sign-in");
    }

    context.set(userContext, session.user as User);
    next();
  } catch (error) {
    console.error(error);
    throw error;
  }

};