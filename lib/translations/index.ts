import { rows as part1 } from "./part1";
import { rows as part2 } from "./part2";

/** Rows are [English, Spanish, Dutch, Arabic]. English text is the lookup key. */
/** "N platforms" for any number of live solutions, since the count follows the dashboard. */
const counts: [string, string, string, string][] = Array.from({ length: 28 }, (_, i) => {
  const n = i + 3;
  return [`${n} platforms`, `${n} plataformas`, `${n} platforms`, `${n} ${n <= 10 ? "منصات" : "منصة"}`];
});

const all: [string, string, string, string][] = [
  ...part1,
  ...part2,
  ...counts,
  ["We quote based on your needs. Request a demo and we will share a clear price.", "Presupuestamos según sus necesidades. Solicite una demostración y le daremos un precio claro.", "Wij maken een offerte op maat. Vraag een demo aan en wij geven u een duidelijke prijs.", "نقدّم عرض سعر بحسب احتياجاتك. اطلب عرضًا توضيحيًا وسنزوّدك بسعر واضح."],
  ["Every platform works on its own.", "Cada plataforma funciona por sí sola.", "Elk platform werkt zelfstandig.", "كل منصة تعمل بمفردها."],
];

const build = (i: 1 | 2 | 3) => new Map(all.map((r) => [r[0], r[i]] as const));

export const catalogs = {
  es: build(1),
  nl: build(2),
  ar: build(3),
} as const;
