"use client"
import { useState } from "react"

export default function InterestedPage() {
  const [form, setForm] = useState({ pharmacy: "", name: "", email: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")
  const [err, setErr] = useState("")

  const update = (k: string, v: string) => setForm({ ...form, [k]: v })

  const submit = async () => {
    setErr("")
    if (!form.pharmacy.trim() || (!form.phone.trim() && !form.email.trim())) {
      setErr("Please give your pharmacy name and at least a phone number or email.")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch("/api/interested", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed") }
      setStatus("done")
    } catch (e) {
      setStatus("error")
      setErr(e instanceof Error ? e.message : "Something went wrong.")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", marginTop: 6, marginBottom: 14,
    border: "1px solid #cfddd9", borderRadius: 8, fontSize: 15, boxSizing: "border-box",
  }
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: "#143C46" }

  return (
    <div style={{ minHeight: "100vh", background: "#eaf3f1", display: "flex",
                  alignItems: "center", justifyContent: "center", padding: 20,
                  fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 460, background: "#fff", borderRadius: 16,
                    padding: 32, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#1a7a6e", marginBottom: 2 }}>MyMedic</div>
        <div style={{ fontSize: 12, letterSpacing: 2, color: "#888", textTransform: "uppercase", marginBottom: 20 }}>Health Assistant</div>

        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>&#10003;</div>
            <h2 style={{ color: "#143C46" }}>Thank you!</h2>
            <p style={{ color: "#555" }}>We&apos;ve received your details and will be in touch shortly to set up MyMedic for your pharmacy.</p>
          </div>
        ) : (
          <>
            <h2 style={{ color: "#143C46", fontSize: 20, marginBottom: 4 }}>Get MyMedic for your pharmacy</h2>
            <p style={{ color: "#555", fontSize: 14, marginBottom: 20 }}>
              Leave your details and we&apos;ll set up your branded health assistant. Free for your customers.
            </p>

            <label style={labelStyle}>Pharmacy name *</label>
            <input style={inputStyle} value={form.pharmacy} onChange={e => update("pharmacy", e.target.value)} placeholder="Your pharmacy" />

            <label style={labelStyle}>Your name</label>
            <input style={inputStyle} value={form.name} onChange={e => update("name", e.target.value)} placeholder="Owner / manager" />

            <label style={labelStyle}>Email</label>
            <input style={inputStyle} value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@pharmacy.co.za" />

            <label style={labelStyle}>Phone *</label>
            <input style={inputStyle} value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="0XX XXX XXXX" />

            <label style={labelStyle}>Message (optional)</label>
            <textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.message} onChange={e => update("message", e.target.value)} placeholder="Anything you would like us to know" />

            {err && <div style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>{err}</div>}

            <button onClick={submit} disabled={status === "sending"}
              style={{ width: "100%", padding: "14px", background: "#1a7a6e", color: "#fff",
                       border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700,
                       cursor: status === "sending" ? "wait" : "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
              {status === "sending" ? "Sending..." : "Yes - I am interested"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}