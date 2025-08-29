import React from "react";

async function fetchProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Product fetch failed");
  const data = await res.json();
  return data.product;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);
  if (!product) return <div>Not found</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.images?.[0] || "/placeholder.png"} alt={product.name} width={320} />
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
