import { mailFrom, resendKey } from "./env";

export type Mail = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: { filename: string; content: string }[]; // content = base64
};

/** Escapes text before it goes into an HTML email. */
export const esc = (s: string | null | undefined) =>
  (s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Sends through Resend. Never throws: returns false when email is not configured or fails. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const key = resendKey();
  const to = Array.isArray(mail.to) ? mail.to : [mail.to];
  if (!key || to.length === 0) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: mailFrom(),
        to,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        reply_to: mail.replyTo,
        attachments: mail.attachments,
      }),
    });
    if (!res.ok) console.warn("Email not sent:", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.warn("Email not sent:", e instanceof Error ? e.message : e);
    return false;
  }
}

/** A plain, readable email layout. */
export function layout(title: string, rows: [string, string | null | undefined][], footer = ""): string {
  const body = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#505452;vertical-align:top">${esc(k)}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`)
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#000;max-width:560px"><h2 style="color:#3d7766;margin:0 0 12px">${esc(title)}</h2><table>${body}</table>${footer ? `<p style="color:#505452;margin-top:16px">${footer}</p>` : ""}</div>`;
}
