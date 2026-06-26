export const signupValidator = (name: string, email: string, password: string, confirmPassword: string) => {
  const errors = [];

  // Is valid name (should only include alphabetical characters or spaces and must be at least three characters long)
  if (!name.match(/^[A-Za-z]+/)) errors.push("Display name must only consist of alphabetical characters and spaces");
  if (name.length < 3) errors.push("Display name must be at least 3 characters long");

  // Is valid email
  if (!email.includes("@")) errors.push("Invalid email address");

  // Password is valid (length >= 8)
  if (password.length < 8) errors.push("Password too short (must be at least 8 characters)");
  if (password !== confirmPassword) errors.push("Passwords do not match");

  return errors;
};