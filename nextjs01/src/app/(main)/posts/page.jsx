import { cacheTag, revalidateTag } from "next/cache";
import { CACHE } from "../constants/cache.constant";
import fs from "fs/promises";
import path from "path";

export const getPosts = async () => {
  const response = await fetch(`http://localhost:3000/posts`, {
    // next: {
    //   revalidate: 10,
    // },
    cache: "force-cache",
    next: {
      tags: [CACHE.POST.LIST],
    },
  });
  const data = await response.json();
  return data;
};
const handleAdd = async (formData) => {
  "use server";
  const title = formData.get("title");
  const response = await fetch(`http://localhost:3000/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (response.ok) {
    revalidateTag(CACHE.POST.LIST);
  }
};
const getTodo = async () => {
  "use cache";
  cacheTag("todo:list");
  const dataPath = await fs.readFile(
    path.join(process.cwd(), "src", "app", "data", "data.json"),
    "utf-8",
  );
  return JSON.parse(dataPath);
};
export default async function PostsPage() {
  const posts = await getPosts();
  const todos = await getTodo();
  return (
    <div>
      <h1 className="text-3xl mb-3">Posts</h1>
      {posts.map((post) => (
        <h2 key={post.id}>{post.title}</h2>
      ))}
      <h2 className="text-3xl mb-3">Todos</h2>
      {todos.map((todo) => (
        <h2 key={todo.id}>{todo.task}</h2>
      ))}
      <form action={handleAdd}>
        <input
          type="text"
          className="w-full px-3 py-1 border border-[#ddd] outline-none"
          placeholder="Title..."
          name="title"
        />
        <button className="px-3 py-1 bg-green-600 text-white">Add</button>
      </form>
    </div>
  );
}
