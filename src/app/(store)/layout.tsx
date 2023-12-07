import Header from "@/components/header/header";
import { type ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}
