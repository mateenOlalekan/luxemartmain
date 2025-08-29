"use client";
import React from "react";

export default function ProductCard({ product }: { product: any }) {
  return (
    <article style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
      <img src={product.images?.[0] || "/placeholder.png"} alt={product.name} width={180} height={120} />
      <h3><a href={`/products/${product._id}`}>{product.name}</a></h3>
      <p>{product.brand}</p>
      <p>${product.price}</p>
    </article>
  );
}
