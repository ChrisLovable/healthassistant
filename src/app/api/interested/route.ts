import { NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const resend = new Resend(process.env.RESEND_API_KEY)
const LEAD_TO = "chris@spreakr.com"
const LEAD_FROM = "MyMedic Leads <noreply@spreakr.com>"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const pharmacy = (body.pharmacy || "").toString().trim()
    const name = (body.name || "").toString().trim()
    const email = (body.email || "").toString().trim()
    const phone = (body.phone || "").toString().trim()
    const message = (body.message || "").toString().trim()

    if (!pharmacy || (!phone && !email)) {
      return NextResponse.json(
        { error: "Pharmacy name and at least a phone or email are required." },
        { status: 400 }
      )
    }

    const html = "<h2>New MyMedic lead</h2>" +
      "<p><strong>Pharmacy:</strong> " + pharmacy + "</p>" +
      "<p><strong>Contact name:</strong> " + (name || "-") + "</p>" +
      "<p><strong>Email:</strong> " + (email || "-") + "</p>" +
      "<p><strong>Phone:</strong> " + (phone || "-") + "</p>" +
      "<p><strong>Message:</strong> " + (message || "-") + "</p>" +
      "<hr/><p style='color:#888;font-size:12px'>Submitted via the MyMedic interest form</p>"

    const { error } = await resend.emails.send({
      from: LEAD_FROM,
      to: LEAD_TO,
      replyTo: email || undefined,
      subject: "New MyMedic lead: " + pharmacy,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Could not send. Please try again." }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("interested route error:", e)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}