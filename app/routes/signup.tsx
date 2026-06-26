import { Form } from "react-router";
import { buttonStyle, formInputStyle, formRowStyle, formStyle, headingStyle } from "~/styles/styleTemplates";

const Signup = () => {
  return (
    <div className="">
      <h1 className={headingStyle}>Sign Up</h1>
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
            <label htmlFor="confim-password">Confirm Password: </label>
            <input className={formInputStyle} type="password" id="confim-password" name="confim-password" />
          </div>
        </div>
        <button type="submit" className={buttonStyle}>Sign Up</button>
      </Form>
    </div>
  );
};

export default Signup;