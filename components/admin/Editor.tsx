"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Eye, Plus, Save, Send, Trash2, Undo2 } from "lucide-react";
import { publish, saveDraft, unpublish } from "@/app/admin/actions";
import { SECTION_KEYS, type Solution } from "@/lib/content";
import { dirOf, langNames, locales, type L, type Lang } from "@/lib/i18n";
import { checkSchema, solutionSchema } from "@/lib/seo";
import { ACCENTS, CATEGORIES, ICON_NAMES, MOCKS, SECTION_LABELS, type SolutionContent } from "@/lib/solution-schema";

type Tab = "content" | "sections" | "seo";
type Role = "admin" | "editor";
type Story = NonNullable<Solution["story"]>;
const EMPTY_STORY: Story = { statement: { en: "", ur: "" }, before: [], after: [], faqs: [] };
const blank = (): L => ({ en: "", ur: "" });

const input = "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const label = "mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-soft";
const btn = "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50";

function LLField({ lang, name, value, onChange, rows }: { lang: Lang; name: string; value: L; onChange: (v: L) => void; rows?: number }) {
  const dir = dirOf(lang);
    const text = value[lang] ?? "";
    const props = {
      value: text,
      dir,
      placeholder: lang === "en" ? "" : `Empty = ${lang === "ur" ? "English" : "built-in translation, or English"}: ${value.en.slice(0, 60)}`,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...value, [lang]: e.target.value }),
      className: input,
    };
    return (
      <label className="block">
        {name && <span className={label}>{name}</span>}
        {rows ? <textarea rows={rows} {...props} /> : <input {...props} />}
      </label>
    );
  }

function LLList({ lang, name, items, onChange, rows, make = blank }: { lang: Lang; name: string; items: L[]; onChange: (v: L[]) => void; rows?: number; make?: () => L }) {
  return (
    <div>
      <span className={label}>{name}</span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1"><LLField lang={lang} name="" value={it} rows={rows} onChange={(v) => onChange(items.map((x, k) => (k === i ? v : x)))} /></div>
            <div className="flex shrink-0 flex-col gap-1">
              <button type="button" disabled={i === 0} onClick={() => onChange(move(items, i, -1))} className="rounded border border-line p-1 disabled:opacity-30" aria-label="Move up"><ArrowUp size={14} /></button>
              <button type="button" disabled={i === items.length - 1} onClick={() => onChange(move(items, i, 1))} className="rounded border border-line p-1 disabled:opacity-30" aria-label="Move down"><ArrowDown size={14} /></button>
            </div>
            <button type="button" onClick={() => onChange(items.filter((_, k) => k !== i))} className="rounded border border-line p-2 text-red-600" aria-label="Remove"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, make()])} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"><Plus size={14} /> Add</button>
    </div>
  );
}


export function SolutionEditor({ id, slug, initial, initialStatus, role }: { id: string; slug: string; initial: SolutionContent; initialStatus: "draft" | "published"; role: Role }) {
  const [c, setC] = useState<SolutionContent>(initial);
  const [lang, setLang] = useState<Lang>("en");
  const [tab, setTab] = useState<Tab>("content");
  const [status, setStatus] = useState(initialStatus);
  const [dirty, setDirty] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const patch = (p: Partial<SolutionContent>) => {
    setC((prev) => ({ ...prev, ...p }));
    setDirty(true);
  };
  const story = c.story ?? EMPTY_STORY;
  const setStory = (p: Partial<Story>) => patch({ story: { ...story, ...p } });
  const dir = dirOf(lang);

  /* -------------------------------------------------------------- actions */

  const run = (fn: () => Promise<{ ok: boolean; error?: string; message?: string }>) =>
    start(async () => {
      const r = await fn();
      setNote({ ok: r.ok, text: r.ok ? (r.message ?? "Done.") : (r.error ?? "Failed.") });
    });

  const save = () =>
    run(async () => {
      const r = await saveDraft(id, c);
      if (r.ok) setDirty(false);
      return r;
    });

  const publishNow = () =>
    run(async () => {
      const saved = await saveDraft(id, c);
      if (!saved.ok) return saved;
      setDirty(false);
      const r = await publish(id);
      if (r.ok) setStatus("published");
      return r;
    });

  const unpublishNow = () =>
    run(async () => {
      const r = await unpublish(id);
      if (r.ok) setStatus("draft");
      return r;
    });

  /* ------------------------------------------------------------------ SEO */

  const seoLang = c.seo?.langs?.[lang] ?? {};
  const setSeo = (p: Partial<NonNullable<typeof seoLang>>) =>
    patch({ seo: { ...c.seo, langs: { ...c.seo?.langs, [lang]: { ...seoLang, ...p } } } });
  const asSolution = { ...c, slug } as Solution;
  const schemaError = seoLang.schema ? checkSchema(seoLang.schema) : null;
  const title = seoLang.title?.trim() || `${c.name[lang] || c.name.en}: ${c.tagline[lang] || c.tagline.en}`;
  const desc = seoLang.description?.trim() || (c.description[lang] || c.description.en).slice(0, 160);

  return (
    <div className="pb-24">
      {/* top bar */}
      <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-line bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin" className="text-sm text-ink-soft hover:underline">← All solutions</Link>
          <h1 className="text-lg font-extrabold">{c.name.en || slug}</h1>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${status === "published" ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-800"}`}>
            {status === "published" ? "Published" : "Draft"}
          </span>
          {dirty && <span className="text-xs font-semibold text-amber-700">Unsaved changes</span>}
          <div className="ms-auto flex flex-wrap gap-2">
            <Link href={`/admin/preview/${id}?lang=${lang}`} target="_blank" className={`${btn} border border-line hover:bg-mist`}><Eye size={15} /> Preview saved draft</Link>
            <button onClick={save} disabled={pending || !dirty} className={`${btn} bg-black text-white hover:bg-black/85`}><Save size={15} /> Save draft</button>
            {role === "admin" && <button onClick={publishNow} disabled={pending} className={`${btn} bg-brand-600 text-white hover:bg-brand-700`}><Send size={15} /> {status === "published" ? "Save and update live" : "Save and publish"}</button>}
            {role === "admin" && status === "published" && <button onClick={unpublishNow} disabled={pending} className={`${btn} border border-red-200 text-red-700 hover:bg-red-50`}><Undo2 size={15} /> Unpublish</button>}
          </div>
        </div>
        {note && <p role="status" className={`mt-2 rounded-lg px-3 py-2 text-sm ${note.ok ? "bg-brand-50 text-brand-800" : "bg-red-50 text-red-700"}`}>{note.text}</p>}
        {role === "editor" && <p className="mt-2 text-xs text-ink-soft">You are an editor: you can save drafts. An admin publishes them.</p>}
      </div>

      {/* language + tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-line bg-white p-1" role="tablist">
          {(["content", "sections", "seo"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)} role="tab" aria-selected={tab === t} className={`rounded-md px-4 py-1.5 text-sm font-semibold capitalize ${tab === t ? "bg-black text-white" : "text-ink-soft"}`}>{t === "seo" ? "SEO" : t}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Editing language</span>
          <div className="inline-flex rounded-lg border border-line bg-white p-1">
            {locales.map((l) => (
              <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-md px-3 py-1.5 text-sm font-semibold ${lang === l ? "bg-brand-600 text-white" : "text-ink-soft"}`}>{langNames[l]}</button>
            ))}
          </div>
        </div>
      </div>

      {tab === "content" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Hero text</h2>
            <LLField lang={lang} name="Name" value={c.name} onChange={(v) => patch({ name: v })} />
            <LLField lang={lang} name="Tagline" value={c.tagline} onChange={(v) => patch({ tagline: v })} />
            <LLField lang={lang} name="Description" value={c.description} rows={4} onChange={(v) => patch({ description: v })} />
          </section>

          <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Look and links</h2>
            <div className="grid grid-cols-2 gap-3">
              <label><span className={label}>Icon</span>
                <select className={input} value={c.icon} onChange={(e) => patch({ icon: e.target.value })}>{ICON_NAMES.map((n) => <option key={n}>{n}</option>)}</select>
              </label>
              <label><span className={label}>Category</span>
                <select className={input} value={c.category} onChange={(e) => patch({ category: e.target.value as Solution["category"] })}>{CATEGORIES.map((n) => <option key={n}>{n}</option>)}</select>
              </label>
              <label><span className={label}>Dashboard picture</span>
                <select className={input} value={c.mock ?? slug} onChange={(e) => patch({ mock: e.target.value })}>{MOCKS.map((n) => <option key={n}>{n}</option>)}</select>
              </label>
              <label><span className={label}>Badge</span>
                <select className={input} value={c.status} onChange={(e) => patch({ status: e.target.value as Solution["status"] })}><option value="live">Live</option><option value="new">New</option></select>
              </label>
            </div>
            <div>
              <span className={label}>Colour</span>
              <div className="flex flex-wrap gap-2">
                {ACCENTS.map((a) => (
                  <button key={a} type="button" onClick={() => patch({ accent: a })} aria-label={a} aria-pressed={c.accent === a} className={`h-9 w-9 rounded-lg bg-gradient-to-br ${a} ring-offset-2 ${c.accent === a ? "ring-2 ring-black" : ""}`} />
                ))}
              </div>
            </div>
            <label className="block"><span className={label}>Website link (optional)</span>
              <input className={input} dir="ltr" value={c.url ?? ""} placeholder="https://" onChange={(e) => patch({ url: e.target.value || undefined })} />
            </label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(c.pricingOnSite)} onChange={(e) => patch({ pricingOnSite: e.target.checked })} /> Prices are shown on that website</label>
            <p className="text-xs text-ink-soft">Address: <code className="rounded bg-mist px-1.5 py-0.5">/solutions/{slug}</code></p>
          </section>

          <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Features</h2>
            <LLList lang={lang} name="Four short feature lines" items={c.features} onChange={(v) => patch({ features: v })} />
          </section>
          <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Who it is for</h2>
            <LLList lang={lang} name="Three audiences" items={c.forWho} onChange={(v) => patch({ forWho: v })} />
          </section>
        </div>
      )}

      {tab === "sections" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-3 rounded-2xl border border-line bg-white p-5 lg:col-span-2">
            <h2 className="font-bold">Show or hide sections</h2>
            <div className="grid gap-2 sm:grid-cols-3">
              {SECTION_KEYS.map((k) => {
                const hidden = c.hidden?.includes(k) ?? false;
                return (
                  <label key={k} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm">
                    <input type="checkbox" checked={!hidden} onChange={() => patch({ hidden: hidden ? (c.hidden ?? []).filter((x) => x !== k) : [...(c.hidden ?? []), k] })} />
                    {SECTION_LABELS[k]}
                  </label>
                );
              })}
            </div>
          </section>
          <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Statement</h2>
            <LLField lang={lang} name="Large statement" rows={4} value={story.statement} onChange={(v) => setStory({ statement: v })} />
          </section>
          <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Before and after</h2>
            <LLList lang={lang} name="Without ePortal (problems)" items={story.before} onChange={(v) => setStory({ before: v })} />
            <LLList lang={lang} name="With ePortal (benefits)" items={story.after} onChange={(v) => setStory({ after: v })} />
          </section>
          <section className="space-y-4 rounded-2xl border border-line bg-white p-5 lg:col-span-2">
            <h2 className="font-bold">FAQ</h2>
            {story.faqs.map((f, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-line p-3">
                <LLField lang={lang} name={`Question ${i + 1}`} value={f.q} onChange={(v) => setStory({ faqs: story.faqs.map((x, k) => (k === i ? { ...x, q: v } : x)) })} />
                <LLField lang={lang} name="Answer" rows={3} value={f.a} onChange={(v) => setStory({ faqs: story.faqs.map((x, k) => (k === i ? { ...x, a: v } : x)) })} />
                <button type="button" onClick={() => setStory({ faqs: story.faqs.filter((_, k) => k !== i) })} className="text-sm font-semibold text-red-600">Remove this question</button>
              </div>
            ))}
            <button type="button" onClick={() => setStory({ faqs: [...story.faqs, { q: blank(), a: blank() }] })} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"><Plus size={14} /> Add question</button>
          </section>
        </div>
      )}

      {tab === "seo" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Search settings: {langNames[lang]}</h2>
              <button type="button" className="text-sm font-semibold text-brand-600" onClick={() => setSeo({ title: `${c.name[lang] || c.name.en}: ${c.tagline[lang] || c.tagline.en}`.slice(0, 70), description: (c.description[lang] || c.description.en).slice(0, 160) })}>Fill from content</button>
            </div>
            <label className="block"><span className={label}>SEO title ({(seoLang.title ?? "").length}/60 recommended)</span>
              <input className={input} dir={dir} value={seoLang.title ?? ""} onChange={(e) => setSeo({ title: e.target.value })} />
            </label>
            <label className="block"><span className={label}>Meta description ({(seoLang.description ?? "").length}/160 recommended)</span>
              <textarea rows={3} className={input} dir={dir} value={seoLang.description ?? ""} onChange={(e) => setSeo({ description: e.target.value })} />
            </label>
            <label className="block"><span className={label}>Keywords (separated by commas)</span>
              <input className={input} dir={dir} value={seoLang.keywords ?? ""} onChange={(e) => setSeo({ keywords: e.target.value })} />
            </label>
            <label className="block"><span className={label}>Share image link (all languages)</span>
              <input className={input} dir="ltr" placeholder="https://…/image.jpg (1200×630)" value={c.seo?.ogImage ?? ""} onChange={(e) => patch({ seo: { ...c.seo, ogImage: e.target.value || undefined } })} />
            </label>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-line bg-white p-5">
              <h2 className="font-bold">Google preview</h2>
              <div className="mt-3 rounded-xl bg-mist p-4" dir={dir}>
                <p className="truncate text-xs text-ink-soft" dir="ltr">eportal.pk › {lang} › solutions › {slug}</p>
                <p className="mt-1 truncate text-lg text-[#1a0dab]">{title}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">{desc}</p>
              </div>
            </section>

            <section className="space-y-3 rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Schema (JSON-LD)</h2>
                <button type="button" className="text-sm font-semibold text-brand-600" onClick={() => setSeo({ schema: JSON.stringify(solutionSchema({ ...asSolution, seo: undefined }, lang), null, 2) })}>Generate from content</button>
              </div>
              <textarea rows={14} dir="ltr" spellCheck={false} className={`${input} font-mono text-xs`} value={seoLang.schema ?? ""} placeholder="Leave empty to use the automatic schema (software, breadcrumbs and FAQ)." onChange={(e) => setSeo({ schema: e.target.value })} />
              {schemaError ? <p className="text-sm text-red-600">{schemaError}</p> : seoLang.schema ? <p className="text-sm text-brand-700">Valid JSON.</p> : null}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function move<T>(list: T[], i: number, by: number): T[] {
  const next = [...list];
  const j = i + by;
  if (j < 0 || j >= next.length) return list;
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}
