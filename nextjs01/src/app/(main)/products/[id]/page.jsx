import Image from "next/image";
import ProductImage from "./ProductImage";
import { getProducts } from "../page";

const getProduct = async (id) => {
  const response = await fetch(`${process.env.SERVER_API}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Có lỗi khi lấy products`);
  }
  return response.json();
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
export default async function ProductDetail({ params }) {
  // const products = await getProducts();
  // console.log(products);
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
