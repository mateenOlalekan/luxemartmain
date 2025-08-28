// app/customer/layout.tsx
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "@/app/globals.css"; // still bring in global styles

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar/>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <Footer/>
    </div>
  );
}
