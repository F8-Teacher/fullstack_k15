import { CONFIG } from "@/app/constants/config.constant";
import Image from "next/image";
import React from "react";
import AddToCart from "./AddToCart";
const getProducts = async () => {
  const response = await fetch(`${CONFIG.BASE_API}/products`);
  const { products } = await response.json();
  return products;
};
export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl mb-3">Products</h1>
      <div className="flex flex-wrap -mx-3">
        {products.map((product) => (
          <div key={product._id} className="px-3 mb-3 w-1/4">
            <div>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="h-75 object-cover"
              />
              <h2 className="text-xl mb-3">{product.name}</h2>
              <AddToCart {...product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
