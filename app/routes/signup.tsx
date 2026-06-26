import { data, Form, redirect } from "react-router";
import type { Route } from "./+types/signup";
import { authErrorContainerStyle, authErrorHeadingStyle, authErrorItemStyle, authErrorListStyle, buttonStyle, formInputStyle, formRowStyle, formStyle, headingStyle } from "~/styles/styleTemplates";
import { signupValidator } from "~/lib/signup-validator";
import { useState } from "react";

const Signup = ({ actionData }: Route.ComponentProps) => {
  const [errorList, setErrorList] = useState<string[]>([]);

  if (actionData && errorList.length === 0) setErrorList(actionData.errors);

  return (
    <div className={authErrorContainerStyle}>
      <h1 className={headingStyle}>Sign Up</h1>
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
      <Form className={formStyle} method="post">
        <div className="mb-4">
          <div className={formRowStyle}>
            <label htmlFor="name">Display Name: </label>
            <input className={formInputStyle} type="text" id="name" name="name" />
          </div>
          <div className={formRowStyle}>
            <label htmlFor="email">Email Address: </label>
            <input className={formInputStyle} type="email" id="email" name="email" />
          </div>
          <div className={formRowStyle}>
            <label htmlFor="password">Password: </label>
            <input className={formInputStyle} type="password" id="password" name="password" />
          </div>
          <div className={formRowStyle}>
            <label htmlFor="passwordconfirm">Confirm Password: </label>
            <input className={formInputStyle} type="password" id="passwordconfirm" name="passwordconfirm" />
          </div>
        </div>
        <button type="submit" className={buttonStyle}>Sign Up</button>
      </Form>
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

  console.log(errors);
  if (errors.length > 0) return data({ errors }, { status: 400 });

  // Authenticate with Better Auth

};

export default Signup;