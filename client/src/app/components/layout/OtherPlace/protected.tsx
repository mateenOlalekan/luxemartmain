"use client";
import React, { useEffect, useState } from "react";

export default function Protected({ children, adminOnly = false }: { children: any, adminOnly?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/me`, { credentials: "include" });
        if (!res.ok) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (adminOnly && data.user.role !== "admin") {
          setError("Admin access required.");
          setLoading(false);
          return;
        }
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        setError("Network error.");
        setLoading(false);
      }
    };
    fetchMe();
  }, [adminOnly]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return <>{children}</>;
}
