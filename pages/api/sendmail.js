import { sendEmail } from "../../utils/email"

export default async function handler(req, res) {
  // Basic CORS headers (safe even for same-origin)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    // CORS preflight
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST", "OPTIONS"])
    return res.status(405).json({
      error: {
        code: "method_not_allowed",
        message: "This endpoint only supports POST.",
      },
    })
  }

  const { subject, to, content } = req.body || {}
  if (!to || !subject || !content) {
    return res.status(400).json({
      error: {
        code: "bad_request",
        message: "Missing required fields: subject, to, content",
      },
    })
  }

  try {
    await sendEmail({ subject, to, content })
    return res.status(200).json({ ok: true })
  } catch (err) {
    const status = err?.response?.status || 500
    const data = err?.response?.data
    return res.status(status).json({
      error: {
        code: "email_send_failed",
        message: "Failed to send email via Brevo",
        details: data || err?.message,
      },
    })
  }
}
