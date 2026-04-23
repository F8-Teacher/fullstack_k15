import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
// import { cookies } from "next/headers";
export const getProducts = async (q = "") => {
  const response = await fetch(
    `${process.env.SERVER_API}/products/search?q=${q}`,
  );
  if (!response.ok) {
    throw new Error(`Có lỗi khi lấy products`);
  }
  const { products } = await response.json();
  return products;
};
export default async function ProductsPage({ searchParams }) {
  const { page, q } = await searchParams;
  const products = await getProducts(q);
  // const cookieStore = await cookies();
  // console.log(cookieStore.get("token"));
  // cookieStore.delete("token");

  return (
    <div>
      <h1 className="text-3xl">Products</h1>
      <h2>Search: {q}</h2>
      <SearchInput />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <div key={product.id}>
            <Image
              width={300}
              height={300}
              src={product.thumbnail}
              alt={product.title}
            />
            <h3>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
