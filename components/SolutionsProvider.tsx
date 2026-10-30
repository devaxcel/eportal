"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Solution } from "@/lib/content";

const Ctx = createContext<Solution[]>([]);

/** Gives client components (header menu, demo form) the published solutions loaded on the server. */
export function SolutionsProvider({ solutions, children }: { solutions: Solution[]; children: ReactNode }) {
  return <Ctx.Provider value={solutions}>{children}</Ctx.Provider>;
}

export const useSolutions = () => useContext(Ctx);
