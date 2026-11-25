import { ImageResponse } from "next/og";

export const runtime = "nodejs";

/** Default share image (1200x630) for links shared on WhatsApp, LinkedIn, Facebook, X and Slack. */
export async function GET() {
  const names = ["SchoolDesk", "ApproveFlow", "LeadChat", "SaleDesk", "Influnexa"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #1c3830 0%, #2f5e51 55%, #4f8c7a 100%)", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 96, height: 96, borderRadius: 26, background: "#fff", color: "#2f5e51", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, fontWeight: 800 }}>e</div>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>Portal</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Smart platforms for schools, business and retail</div>
          <div style={{ fontSize: 34, color: "#c0dbd2" }}>Custom portals and business websites. Built in Lahore.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {names.map((n) => (
              <div key={n} style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.14)", fontSize: 22, fontWeight: 600 }}>{n}</div>
            ))}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#97c2b5" }}>eportal.pk</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" } },
  );
}
