"use client";

import { axiosInstance } from "@/app/libs/axios";
import { toast } from "sonner";

export default function AddToCart({ _id, name }) {
  const handleAddToCart = async () => {
    try {
      await axiosInstance.post(`/shopping-cart`, {
        productId: _id,
        quantity: 1,
      });
      toast.success("Add to cart success");
    } catch {
      toast.error("Add to cart failed");
    }
  };
  return (
    <button
      onClick={handleAddToCart}
      className="px-3 py-1 bg-amber-700 text-white"
    >
      Add to cart
    </button>
  );
}
