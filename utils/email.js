import axios from "axios"

const SENDINBLUE_API = "https://api.sendinblue.com/v3/smtp/email"

const sendEmail = async ({ subject, to, content }) => {
  await axios(SENDINBLUE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": `${process.env.SENDINBLUE_API_KEY}`,
      accept: "application/json",
    },
    data: JSON.stringify({
      sender: {
        name: "Resistic",
        email: "cercec.general@gmail.com",
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      htmlContent: content,
    }),
  })
}

export { sendEmail }
