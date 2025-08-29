"use client";
import React, { useState } from "react";
export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: ""});
  const [msg, setMsg] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) return setMsg(JSON.stringify(data));
      setMsg("Registered. You are logged in.");
    } catch (err) {
      setMsg("Network error");
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div><input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} /></div>
        <div><input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} /></div>
        <div><input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} /></div>
        <button type="submit">Register</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
