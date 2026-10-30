import { rows as part1 } from "./part1";

/** Rows are [English, Spanish, Dutch, Arabic]. English text is the lookup key. */
const all: [string, string, string, string][] = [...part1];

const build = (i: 1 | 2 | 3) => new Map(all.map((r) => [r[0], r[i]] as const));

export const catalogs = {
  es: build(1),
  nl: build(2),
  ar: build(3),
} as const;
