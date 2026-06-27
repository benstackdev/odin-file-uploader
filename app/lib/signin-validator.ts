export const signinValidator = (email: string) => {
  const errors = [];

  // Is valid email
  if (!email.includes("@")) errors.push("Invalid email address");

  return errors;
};