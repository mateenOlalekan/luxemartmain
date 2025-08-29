"use client";
import React, { useState } from "react";

export default function ProductForm({ initial = {}, onSuccess }: { initial?: any, onSuccess?: (p: any) => void }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    brand: initial.brand || "",
    category: initial.category || "",
    description: initial.description || "",
    price: initial.price || 0,
    countInStock: initial.countInStock || 0,
    images: initial.images || []
  });
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = initial._id ? "PUT" : "POST";
      const url = initial._id ? `${process.env.NEXT_PUBLIC_API_BASE}/products/${initial._id}` : `${process.env.NEXT_PUBLIC_API_BASE}/products`;
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(JSON.stringify(data));
        return;
      }
      setMsg("Success");
      onSuccess?.(data.product || data);
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><label>Name <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></label></div>
      <div><label>Brand <input value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} /></label></div>
      <div><label>Category <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></label></div>
      <div><label>Description <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></label></div>
      <div><label>Price <input type="number" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} /></label></div>
      <div><label>Count In Stock <input type="number" value={form.countInStock} onChange={e => setForm({...form, countInStock: Number(e.target.value)})} /></label></div>
      <div><label>Images (comma separated) <input value={form.images.join(",")} onChange={e => setForm({...form, images: e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} /></label></div>
      <button type="submit">Save</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
