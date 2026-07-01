import { data, Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/signup";
import { authErrorContainerStyle, authErrorHeadingStyle, authErrorItemStyle, authErrorListStyle, buttonStyle, formInputStyle, formRowStyle, formStyle, headingStyle } from "~/styles/styleTemplates";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";
import { signinValidator } from "~/lib/signin-validator";
import ErrorList from "~/components/ErrorList";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const Signin = ({ actionData }: Route.ComponentProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorList, setErrorList] = useState<string[]>([]);

  if (actionData && errorList.length === 0) setErrorList(actionData);

  const authSignIn = async () => {
    // Authenticate with Better Auth
    const { data, error } = await authClient.signIn.email({
      email,
      password
    });

    if (!error) {
      console.log("Signed in, navigating to root");
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-sm">
      {errorList.length > 0 ? <ErrorList list={errorList} /> : null}
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign into your Odin File Uploader Account
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => navigate("/sign-up")}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form className={formStyle} method="post" onSubmit={authSignIn}>
            <div className={formRowStyle}>
              <Label htmlFor="email">Email Address: </Label>
              <Input type="email" id="email" name="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={formRowStyle}>
              <Label htmlFor="password">Password: </Label>
              <Input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit">Sign In</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  // Get data from form to eventually pass to Better Auth
  const email = String(formData.get("email"));

  // Client-side sign up form validator
  const errors: string[] = signinValidator(email);

  if (errors.length > 0) return errors;
};

export default Signin;