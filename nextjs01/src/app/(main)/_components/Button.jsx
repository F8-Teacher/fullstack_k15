"use client";

import { handleClick } from "../_actions/demo.action";

export default function Button({ count: initCount }) {
  const handleSetCookie = async () => {
    const response = await fetch(`/api/cookies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "token", value: "123" }),
    });
    console.log(response.ok);
  };
  return (
    <>
      <button
        className="px-3 py-2 bg-green-600 text-white"
        onClick={handleSetCookie}
      >
        Set cookie
      </button>
      <button
        className="px-3 py-2 bg-green-600 text-white"
        onClick={() => handleClick("Hello")}
      >
        Demo Server Action
      </button>
    </>
  );
}

//React hook
//State, Lifecycle
//API trình duyệt
