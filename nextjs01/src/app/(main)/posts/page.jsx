import { cacheTag, revalidateTag } from "next/cache";
import { CACHE } from "../../constants/cache.constant";
import Title from "./Title";
// import { cookies } from "next/headers";

export const getPosts = async () => {
  const response = await fetch(`http://localhost:4000/posts`, {
    // next: {
    //   revalidate: 10,
    // },
    // cache: "no-cache",
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
  const response = await fetch(`http://localhost:4000/posts`, {
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
// const getTodo = async () => {
//   "use cache";
//   cacheTag("todo:list");
//   const dataPath = await fs.readFile(
//     path.join(process.cwd(), "src", "app", "data", "data.json"),
//     "utf-8",
//   );
//   return JSON.parse(dataPath);
// };
export default async function PostsPage() {
  const posts = await getPosts();
  // const todos = await getTodo();
  // const cookieStore = await cookies();
  // const { q } = await searchParams;
  return (
    <div>
      <Title />
      {posts.map((post) => (
        <h2 key={post.id}>{post.title}</h2>
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
