"use server";
export const handleLogin = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    success: true,
    message: "Login success",
  };
};
