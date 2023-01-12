import React, { useState } from "react";
import { EditForm, LinksGroup } from "../components/";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-sky-50 min-h-screen flex flex-col">
      <div className="bg-green-500 text-center p-4">
        <h1 className="text-pink-500">Todoapp</h1>
      </div>
      <div className="min-h-screen grid grid-cols-[20%_80%]">
        <LinksGroup />
        <div>{children}</div>
      </div>
      <EditForm />
    </main>
  );
};

export { Layout };
