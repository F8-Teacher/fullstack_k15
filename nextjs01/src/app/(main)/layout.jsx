import React from "react";
import NavBar from "./_components/NavBar";
import MainProvider from "./_components/MainProvider";

export default function MainLayout({ children }) {
  return (
    <div>
      <MainProvider>
        <NavBar />
        <main className="mx-auto max-w-300 py-3">{children}</main>
      </MainProvider>
    </div>
  );
}
