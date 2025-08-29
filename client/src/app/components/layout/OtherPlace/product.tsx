import React from "react";
import ProductCard from "../../components/ProductCard";

async function fetchProducts(params: URLSearchParams) {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  const query = params.toString();
  const res = await fetch(`${base}/products?${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function ProductsPage({ searchParams }: { searchParams?: { [key:string]: string | undefined } }) {
  // build query params from searchParams
  const params = new URLSearchParams();
  const allowed = ["q","name","brand","category","minPrice","maxPrice","page","limit","sort"];
  if (searchParams) {
    for (const k of allowed) {
      const v = searchParams[k];
      if (v) params.set(k, v);
    }
  }
  const data = await fetchProducts(params);

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {data.products.map((p: any) => <ProductCard key={p._id} product={p} />)}
      </div>
      <div>
        <p>Page {data.page} / total {data.total}</p>
        {/* Simple pagination links */}
        {data.page > 1 && <a href={`?page=${data.page -1}`}>Prev</a>}
        {" "}
        <a href={`?page=${data.page + 1}`}>Next</a>
      </div>

      <section style={{ marginTop: 20 }}>
        <h3>Search examples (use links)</h3>
        <ul>
          <li><a href="?q=phone">Full-text q=phone</a></li>
          <li><a href="?name=phone">Partial name=phone</a></li>
          <li><a href="?category=smartphone">category=smartphone</a></li>
          <li><a href="?brand=Soundify">brand=Soundify</a></li>
        </ul>
      </section>
    </div>
  );
}
