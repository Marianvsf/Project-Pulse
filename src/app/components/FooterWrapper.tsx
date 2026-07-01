"use client";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className={isAuthPage ? "hidden md:block" : ""}>
      <Footer />
    </div>
  );
}
