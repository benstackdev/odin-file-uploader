import { data, Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/signup";
import { authErrorContainerStyle, authErrorHeadingStyle, authErrorItemStyle, authErrorListStyle, buttonStyle, formInputStyle, formRowStyle, formStyle, headingStyle } from "~/styles/styleTemplates";
import { signupValidator } from "~/lib/signup-validator";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import ErrorList from "~/components/errorList";

const Signup = ({ actionData }: Route.ComponentProps) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorList, setErrorList] = useState<string[]>([]);

  if (actionData && errorList.length === 0) setErrorList(actionData);

  const authSignUp = async () => {
    // Authenticate with Better Auth
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/sign-in"
    }, {
      onRequest: (ctx) => {
        // loading
      },
      onSuccess: (ctx) => {
        console.log("signup success");
      },
      onError: (ctx) => {

      }
    });

    if (!error) navigate("/sign-in");
  };

  return (
    <div className="w-full max-w-sm">
      {errorList.length > 0 ? <ErrorList list={errorList} /> : null}
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new Odin File Uploader Account</CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <Form className={formStyle} method="post" onSubmit={authSignUp}>
            <div className={formRowStyle}>
              <Label htmlFor="name">Display Name: </Label>
              <Input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={formRowStyle}>
              <Label htmlFor="email">Email Address: </Label>
              <Input type="email" id="email" name="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={formRowStyle}>
              <Label htmlFor="password">Password: </Label>
              <Input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={formRowStyle}>
              <Label htmlFor="passwordconfirm">Confirm Password: </Label>
              <Input type="password" id="passwordconfirm" name="passwordconfirm" />
            </div>
            <Button type="submit">Sign Up</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  // Get data from form to eventually pass to Better Auth
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("passwordconfirm"));

  // Client-side sign up form validator
  const errors: string[] = signupValidator(name, email, password, confirmPassword);

  if (errors.length > 0) return errors;
};

export default Signup;