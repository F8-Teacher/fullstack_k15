"use client";

import { useActionState } from "react";
import { handleLogin } from "../../_actions/auth.action";

export default function LoginForm() {
  const [state, action, pending] = useActionState(handleLogin, {});
  return (
    <form action={action}>
      {state.message && (
        <span className="block text-green-600">{state.message}</span>
      )}
      <div className="mb-3">
        <label htmlFor="">Email</label>
        <input
          type="text"
          className="px-3 py-2 border border-[#ddd] outline-0 w-full"
          placeholder="Email..."
          name="email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="px-3 py-2 border border-[#ddd] outline-0 w-full"
          placeholder="Password..."
          name="password"
        />
      </div>
      <button className="px-3 py-2 bg-green-600 text-white cursor-pointer">
        {pending ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
