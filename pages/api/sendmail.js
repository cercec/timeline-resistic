import {sendEmail} from "../../utils/email";

export default async (req, res) => {
  console.log('test')
  if (req.method === "POST") {
    const { subject, to, content } = req.body
    await sendEmail({ subject, to, content })
    return res.status(200).end()
  }
  return res.status(404).json({
    error: {
      code: "not_found",
      messgae:
        "The requested endpoint was not found or doesn't support this method.",
    },
  })
}
