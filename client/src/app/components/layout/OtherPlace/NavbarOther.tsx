"use client";
import React from "react";

export default function Navbar({ user }: { user?: any }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
      <div>
        <a href="/">Logo</a>
      </div>
      <div>
        <a href="/products">Products</a>
        {" | "}
        {user ? <span>Hi, {user.name}</span> : <a href="/login">Login</a>}
      </div>
    </div>
  );
}
