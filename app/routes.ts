import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("/sign-up", "routes/signup.tsx"),
    route("/sign-in", "routes/signin.tsx"),
    route("/sign-out", "routes/signout.tsx")
  ]),
  route("/api/auth/*", "routes/api.auth.$.ts"),
  route("/action/set-theme", "routes/action.set-theme.ts")
] satisfies RouteConfig;
