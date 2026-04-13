"use client";

export default function Error({ error }) {
  return <h1 className="text-3xl">Error: {error.message}</h1>;
}
