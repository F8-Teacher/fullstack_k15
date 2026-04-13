"use client";

import { useEffect, useState } from "react";

export default function Button({ count: initCount }) {
  const [count, setCount] = useState(initCount);
  const [value, setValue] = useState(0);
  useEffect(() => {
    localStorage.setItem("token", 123);
    (() => {
      setValue(Math.random());
    })();
  }, []);

  return (
    <>
      <h2>{value}</h2>
      <p onClick={() => setCount(count + 1)}>{count}</p>
      <button
        className="px-3 py-2 bg-green-600"
        onClick={() => {
          console.log("Clicked 1");
        }}
      >
        Click me 1
      </button>
      <button
        className="px-3 py-2 bg-green-600"
        onClick={() => {
          console.log("Clicked 2");
        }}
      >
        Click me 2
      </button>
    </>
  );
}

//React hook
//State, Lifecycle
//API trình duyệt
