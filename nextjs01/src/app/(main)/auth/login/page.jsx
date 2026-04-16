import LoginForm from "./LoginForm";

export default function LoginPage() {
  //   const handleLogin = async (formData) => {
  //     "use server";
  //     const email = formData.get("email");
  //     const password = formData.get("password");
  //     console.log(email, password);
  //   };
  //   const handler = async () => {
  //     "use server";
  //     console.log("handler");
  //   };
  return (
    <div className="mx-auto max-w-1/2">
      <h1 className="text-3xl mb-3">Login</h1>
      <LoginForm />
    </div>
  );
}
