"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "../../../actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});
  const router = useRouter();
  useEffect(() => {
    if (state.message) {
      toast.success(state.message);
    }

    if (state.success) {
      router.push("/");
    }
  }, [state]);
  return (
    <form action={action}>
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
