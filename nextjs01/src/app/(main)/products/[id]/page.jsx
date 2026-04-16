import Image from "next/image";
import ProductImage from "./ProductImage";

const getProduct = async (id) => {
  const response = await fetch(`${process.env.SERVER_API}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Có lỗi khi lấy products`);
  }
  return response.json();
};
export default async function ProductDetail({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div>
      <h1 className="text-3xl">{product.title}</h1>
      <p>Price: {product.price.toLocaleString()}</p>
      <ProductImage product={product} />
    </div>
  );
}
