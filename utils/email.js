import axios from "axios"

const BREVO_API = "https://api.brevo.com/v3/smtp/email"

const sendEmail = async ({ subject, to, content }) => {
  // Use axios.post with a plain object payload
  await axios.post(
    BREVO_API,
    {
      sender: {
        name: "ResisTIC",
        email: "cercec.general@gmail.com",
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      htmlContent: content,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": `${process.env.BREVO_API_KEY}`,
        accept: "application/json",
      },
    },
  )
}

export { sendEmail }
