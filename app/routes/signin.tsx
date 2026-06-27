import { data, Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/signup";
import { authErrorContainerStyle, authErrorHeadingStyle, authErrorItemStyle, authErrorListStyle, buttonStyle, formInputStyle, formRowStyle, formStyle, headingStyle } from "~/styles/styleTemplates";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";
import { signinValidator } from "~/lib/signin-validator";

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
    }, {
      onRequest: (ctx) => {
        // loading
      },
      onSuccess: (ctx) => {
        console.log("signin success");
      },
      onError: (ctx) => {

      }
    });

    if (!error) navigate("/dashboard");
  };

  return (
    <div className={authErrorContainerStyle}>
      <h1 className={headingStyle}>Sign In</h1>
      {
        errorList.length > 0 ?
          (
            <div className="">
              <h2 className={authErrorHeadingStyle}>Sign Up Errors</h2>
              <ul className={authErrorListStyle}>
                {errorList.map(error => {
                  return (
                    <li className={authErrorItemStyle}>{error}</li>
                  );
                })}
              </ul>
            </div>
          )
          :
          null
      }
      <Form className={formStyle} method="post" onSubmit={authSignIn}>
        <div className="mb-4">
          <div className={formRowStyle}>
            <label htmlFor="email">Email Address: </label>
            <input className={formInputStyle} type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={formRowStyle}>
            <label htmlFor="password">Password: </label>
            <input className={formInputStyle} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="submit" className={buttonStyle}>Sign In</button>
      </Form>
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