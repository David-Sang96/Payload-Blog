import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="container py-20">{children}</div>;
}
