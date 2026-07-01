import { createContext } from "react-router";
import type { User } from "../../generated/prisma/client";

const userContext = createContext<User | null>(null);
export default userContext;