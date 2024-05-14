import { createContext, ReactNode } from "react";

export const BaseUrlContext = createContext("");

// ReactNode => hook for react used with children
export default function BaseUrlContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const baseUrl = "https://upskilling-egypt.com:3003/api/v1";

	return (
		<BaseUrlContext.Provider value={baseUrl}>
			{children}
		</BaseUrlContext.Provider>
	);
}
