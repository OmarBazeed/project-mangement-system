import { createContext, ReactNode } from "react";

export let BaceUrlCon = createContext("");

// ReactNode => hook for react used with children
export default function BaceUrlContext({ children }: { children: ReactNode }) {
  let BaceUrl = "https://upskilling-egypt.com:3003/api/v1";
  return <BaceUrlCon.Provider value={BaceUrl}>{children}</BaceUrlCon.Provider>;
}
