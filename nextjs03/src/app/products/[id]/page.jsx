import { cache } from "react";

const getProduct = cache(async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    throw new Error(`Có lỗi khi lấy products`);
  }
  return response.json();
});
export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product.title,
  };
};
export default async function ProductDetail({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div>
      <h1 className="text-3xl">{product.title}</h1>
    </div>
  );
}
