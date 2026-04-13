"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImage({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  return (
    <>
      <Image src={selectedImage} alt={product.title} width={300} height={300} />
      <div className="flex gap-2">
        {product.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={product.title}
            width={100}
            height={100}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </>
  );
}
