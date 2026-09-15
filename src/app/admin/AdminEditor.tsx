"use client";

import { useEffect, useState } from "react";
import type { Case, Feature, StackItem, ArchitectureDecision } from "@/lib/cases";

/* ─────────────────────────── 小元件 ─────────────────────────── */

const inputCls =
  "w-full border border-rule bg-ground px-3 py-2 text-sm text-ink outline-none focus:border-accent";

function Field({
  label,
  hint,
  value,
  onChange,
  textarea,
  rows = 4,
  mono,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  mono?: boolean;
}) {
  const id = `f-${label}`;
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">
        {label}
      </span>
      {hint && <span className="mt-0.5 block text-xs text-soft">{hint}</span>}
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} mt-1.5 leading-relaxed ${mono ? "font-mono text-xs" : ""}`}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} mt-1.5`}
        />
      )}
    </label>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule pt-6">
      <h2 className="font-serif text-lg font-bold">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function RowTools({
  index,
  total,
  onMove,
  onRemove,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  onRemove: (i: number) => void;
}) {
  const btn =
    "min-h-8 cursor-pointer border border-rule px-2 text-xs text-soft hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        className={btn}
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        aria-label="上移"
      >
        ↑
      </button>
      <button
        type="button"
        className={btn}
        disabled={index === total - 1}
        onClick={() => onMove(index, index + 1)}
        aria-label="下移"
      >
        ↓
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => onRemove(index)}
        aria-label="刪除這一項"
      >
        刪除
      </button>
    </div>
  );
}

/**
 * 標籤用點選的，不用自由輸入 —— 「LINE 官方帳號」和「LINE官方帳號」差一個空白
 * 就會在「所有作品」頁變成兩個分頁。新標籤才需要打字。
 */
function TagEditor({
  value,
  vocabulary,
  onChange,
}: {
  value: string[];
  vocabulary: string[];
  onChange: (v: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const all = Array.from(new Set([...vocabulary, ...value]));

  function toggle(t: string) {
    onChange(value.includes(t) ? value.filter((x) => x !== t) : [...value, t]);
  }
  function add() {
    const t = draft.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  }

  return (
    <div>
      <span className="block text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">
        分類標籤
      </span>
      <span className="mt-0.5 block text-xs text-soft">
        「所有作品」頁上方的分頁。點一下加入或移除；客戶看得到，不要用技術名詞。
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {all.map((t) => {
          const on = value.includes(t);
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(t)}
              className={`min-h-8 cursor-pointer border px-3 text-sm ${
                on
                  ? "border-accent bg-accent text-[var(--cta-ink)]"
                  : "border-rule text-soft hover:border-accent hover:text-accent"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          id="tag-draft"
          aria-label="新標籤名稱"
          value={draft}
          placeholder="新標籤"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          className={`${inputCls} max-w-56`}
        />
        <button
          type="button"
          onClick={add}
          className="min-h-9 cursor-pointer border border-rule px-3 text-sm text-body hover:border-accent hover:text-accent"
        >
          加入
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── 空白樣板 ─────────────────────────── */

function blankCase(): Case {
  return {
    slug: "",
    name: "",
    type: "",
    label: "",
    tagline: "",
    thumbnail: "",
    tags: [],
    outcome: "",
    role: "",
    duration: "",
    features: [],
    stack: [],
    decisions: [],
  };
}

/* ─────────────────────────── 主元件 ─────────────────────────── */

export default function AdminEditor() {
  const [cases, setCases] = useState<Case[] | null>(null);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/admin/cases")
      .then((r) => r.json())
      .then((d: Case[]) => setCases(d))
      .catch(() => setStatus("讀取失敗，確認 dev server 有在跑"));
  }, []);

  // 有未存的改動時，關掉分頁前攔一下
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!cases) {
    return <p className="p-8 text-sm text-soft">{status || "讀取中…"}</p>;
  }

  const current = cases[selected];
  const tagVocabulary = Array.from(new Set(cases.flatMap((c) => c.tags ?? [])));

  function patch(fn: (draft: Case) => void) {
    setCases((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      fn(next[selected]);
      return next;
    });
    setDirty(true);
    setStatus("");
  }

  function move<T>(arr: T[], from: number, to: number) {
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
  }

  async function save() {
    setStatus("儲存中…");
    const res = await fetch("/api/admin/cases", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cases),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus(`已寫入 src/content/cases.json（${data.count} 筆）`);
      setDirty(false);
    } else {
      setStatus(`沒存成功：${data.error}`);
    }
  }

  async function upload(file: File, filename?: string): Promise<string | null> {
    if (!current.slug) {
      setStatus("先填 slug 才能上傳圖片（圖片會放進 public/cases/<slug>/）");
      return null;
    }
    const body = new FormData();
    body.append("slug", current.slug);
    body.append(
      "file",
      filename ? new File([file], filename, { type: file.type }) : file
    );
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) {
      setStatus(`上傳失敗：${data.error}`);
      return null;
    }
    setStatus(
      data.overwritten ? `已覆蓋 ${data.path}` : `已上傳 ${data.path}`
    );
    return data.path as string;
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[250px_1fr]">
      {/* 側欄 */}
      <aside className="border-b border-rule bg-paper p-5 md:border-r md:border-b-0">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-soft uppercase">
          案例 · {cases.length}
        </p>
        <ul className="mt-3 grid gap-1">
          {cases.map((c, i) => (
            <li key={c.slug || `new-${i}`}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                className={`w-full cursor-pointer px-3 py-2 text-left text-sm ${
                  i === selected
                    ? "bg-accent text-[var(--cta-ink)]"
                    : "text-body hover:bg-tint"
                }`}
              >
                {c.name || c.slug || "（未命名）"}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => {
              setCases([...cases, blankCase()]);
              setSelected(cases.length);
              setDirty(true);
            }}
            className="min-h-10 cursor-pointer border border-rule px-3 text-sm text-body hover:border-accent hover:text-accent"
          >
            ＋ 新增案例
          </button>
          <button
            type="button"
            onClick={() => {
              if (!confirm(`刪掉「${current.name || current.slug}」？圖片檔不會一起刪。`)) return;
              const next = cases.filter((_, i) => i !== selected);
              setCases(next);
              setSelected(Math.max(0, selected - 1));
              setDirty(true);
            }}
            disabled={cases.length <= 1}
            className="min-h-10 cursor-pointer border border-rule px-3 text-sm text-soft hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            刪掉這個案例
          </button>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-soft">
          存檔只寫進 <code>src/content/cases.json</code>，要上線還是要自己 commit + push。
        </p>
      </aside>

      {/* 表單 */}
      <div className="min-w-0">
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ground px-5 py-3">
          <p className="text-sm text-soft">
            {status || (dirty ? "有未儲存的改動" : "沒有未儲存的改動")}
          </p>
          <button
            type="button"
            onClick={save}
            className="min-h-10 cursor-pointer bg-accent px-5 text-sm font-bold text-[var(--cta-ink)] hover:opacity-90"
          >
            儲存
          </button>
        </div>

        <div className="grid gap-7 p-5 pb-20">
          <Section title="卡片（首頁與所有作品頁）">
            <Field
              label="slug"
              hint="網址用，也是圖片資料夾名稱。只允許小寫英數與連字號。"
              value={current.slug}
              onChange={(v) => patch((d) => { d.slug = v; })}
            />
            <Field label="名稱" value={current.name} onChange={(v) => patch((d) => { d.name = v; })} />
            <Field
              label="短標籤"
              hint="例：真實接案 · 仍在維護中"
              value={current.label}
              onChange={(v) => patch((d) => { d.label = v; })}
            />
            <Field
              label="卡片介紹"
              hint="寫給非工程背景的客戶看，一個技術名詞都不要有。"
              textarea
              rows={3}
              value={current.tagline}
              onChange={(v) => patch((d) => { d.tagline = v; })}
            />
            <TagEditor
              key={selected}
              value={current.tags ?? []}
              vocabulary={tagVocabulary}
              onChange={(v) => patch((d) => { d.tags = v; })}
            />
            <div>
              <Field
                label="縮圖路徑"
                hint="慣例是 /cases/<slug>/cover.jpg"
                value={current.thumbnail ?? ""}
                onChange={(v) => patch((d) => { d.thumbnail = v; })}
              />
              <input
                type="file"
                accept="image/*"
                className="mt-2 text-xs text-soft"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const ext = f.name.split(".").pop()?.toLowerCase() ?? "jpg";
                  const p = await upload(f, `cover.${ext}`);
                  if (p) patch((d) => { d.thumbnail = p; });
                  e.target.value = "";
                }}
              />
            </div>
          </Section>

          <Section title="詳情頁抬頭">
            <Field label="type（詳情頁的長標題）" value={current.type} onChange={(v) => patch((d) => { d.type = v; })} />
            <Field label="一句話成果" textarea rows={3} value={current.outcome} onChange={(v) => patch((d) => { d.outcome = v; })} />
            <Field label="角色" value={current.role} onChange={(v) => patch((d) => { d.role = v; })} />
            <Field label="時程" value={current.duration} onChange={(v) => patch((d) => { d.duration = v; })} />
            <Field label="試玩連結" value={current.demoUrl ?? ""} onChange={(v) => patch((d) => { d.demoUrl = v || undefined; })} />
            <Field label="試玩連結文字" value={current.demoLabel ?? ""} onChange={(v) => patch((d) => { d.demoLabel = v || undefined; })} />
            <Field label="官網" value={current.websiteUrl ?? ""} onChange={(v) => patch((d) => { d.websiteUrl = v || undefined; })} />
            <Field label="背景 / 痛點" textarea rows={5} value={current.problem ?? ""} onChange={(v) => patch((d) => { d.problem = v || undefined; })} />
          </Section>

          <Section title={`主要功能（${current.features.length}）`}>
            {current.features.map((f: Feature, i) => (
              <div key={i} className="grid gap-3 border border-rule p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                    功能 {i + 1}
                  </span>
                  <RowTools
                    index={i}
                    total={current.features.length}
                    onMove={(a, b) => patch((d) => move(d.features, a, b))}
                    onRemove={(x) => patch((d) => { d.features.splice(x, 1); })}
                  />
                </div>
                <Field label="標題" value={f.title} onChange={(v) => patch((d) => { d.features[i].title = v; })} />
                <Field label="說明" textarea value={f.problem} onChange={(v) => patch((d) => { d.features[i].problem = v; })} />
                <Field label="補充（可空）" textarea rows={3} value={f.description ?? ""} onChange={(v) => patch((d) => { d.features[i].description = v || undefined; })} />
                <Field
                  label="截圖路徑（一行一張，空的會顯示「截圖待補」）"
                  textarea
                  rows={4}
                  mono
                  value={(f.images ?? []).join("\n")}
                  onChange={(v) =>
                    patch((d) => {
                      const list = v.split("\n").map((x) => x.trim()).filter(Boolean);
                      d.features[i].images = list.length ? list : undefined;
                    })
                  }
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="text-xs text-soft"
                    onChange={async (e) => {
                      const files = Array.from(e.target.files ?? []);
                      for (const file of files) {
                        const p = await upload(file);
                        if (p) {
                          patch((d) => {
                            const cur = d.features[i].images ?? [];
                            if (!cur.includes(p)) cur.push(p);
                            d.features[i].images = cur;
                          });
                        }
                      }
                      e.target.value = "";
                    }}
                  />
                </div>
                <Field
                  label="截圖長寬比（預設 9 / 19 手機直式）"
                  value={f.imagesAspect ?? ""}
                  onChange={(v) => patch((d) => { d.features[i].imagesAspect = v || undefined; })}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => patch((d) => { d.features.push({ title: "", problem: "" }); })}
              className="min-h-10 cursor-pointer border border-rule px-3 text-sm text-body hover:border-accent hover:text-accent"
            >
              ＋ 加一個功能
            </button>
          </Section>

          <Section title="技術細節">
            <Field label="solution 說明" textarea rows={5} value={current.solution?.text ?? ""} onChange={(v) => patch((d) => { d.solution = v ? { ...d.solution, text: v } : undefined; })} />
            <Field label="solution 流程圖（純文字）" textarea rows={6} mono value={current.solution?.flow ?? ""} onChange={(v) => patch((d) => { if (d.solution) d.solution.flow = v || undefined; })} />
            <Field label="技術棧欄位標題（有兩套實作時才需要）" value={current.stackTitle ?? ""} onChange={(v) => patch((d) => { d.stackTitle = v || undefined; })} />

            <div className="grid gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">
                技術棧（{current.stack.length}）
              </span>
              {current.stack.map((s: StackItem, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2">
                  <input
                    aria-label={`第 ${i + 1} 層`}
                    value={s.layer}
                    placeholder="層"
                    onChange={(e) => patch((d) => { d.stack[i].layer = e.target.value; })}
                    className={`${inputCls} w-32 flex-none`}
                  />
                  <input
                    aria-label={`第 ${i + 1} 層用的技術`}
                    value={s.tech}
                    placeholder="技術"
                    onChange={(e) => patch((d) => { d.stack[i].tech = e.target.value; })}
                    className={`${inputCls} min-w-40 flex-1`}
                  />
                  <RowTools
                    index={i}
                    total={current.stack.length}
                    onMove={(a, b) => patch((d) => move(d.stack, a, b))}
                    onRemove={(x) => patch((d) => { d.stack.splice(x, 1); })}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => patch((d) => { d.stack.push({ layer: "", tech: "" }); })}
                className="min-h-10 w-fit cursor-pointer border border-rule px-3 text-sm text-body hover:border-accent hover:text-accent"
              >
                ＋ 加一層
              </button>
            </div>

            <div className="grid gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">
                架構決策（{current.decisions.length}）
              </span>
              {current.decisions.map((d0: ArchitectureDecision, i) => (
                <div key={i} className="grid gap-2 border border-rule p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-soft">決策 {i + 1}</span>
                    <RowTools
                      index={i}
                      total={current.decisions.length}
                      onMove={(a, b) => patch((d) => move(d.decisions, a, b))}
                      onRemove={(x) => patch((d) => { d.decisions.splice(x, 1); })}
                    />
                  </div>
                  <input
                    aria-label={`決策 ${i + 1} 標題`}
                    value={d0.title}
                    placeholder="標題"
                    onChange={(e) => patch((d) => { d.decisions[i].title = e.target.value; })}
                    className={inputCls}
                  />
                  <textarea
                    aria-label={`決策 ${i + 1} 內容`}
                    rows={4}
                    value={d0.body}
                    placeholder="內容"
                    onChange={(e) => patch((d) => { d.decisions[i].body = e.target.value; })}
                    className={`${inputCls} leading-relaxed`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => patch((d) => { d.decisions.push({ title: "", body: "" }); })}
                className="min-h-10 w-fit cursor-pointer border border-rule px-3 text-sm text-body hover:border-accent hover:text-accent"
              >
                ＋ 加一條決策
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
