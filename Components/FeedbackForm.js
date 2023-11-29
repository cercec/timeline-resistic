import React, { useState } from "react"
import axios from "axios"
import { Feedback } from "@material-ui/icons"

export default function FeedbackForm() {
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState("")
  const [notification, setNotification] = useState("")

  let emailContent
  let subject

  emailContent = `<html><head></head><body><p>${message}</p></body></html>`
  subject = "Nouvelle remarque sur la timeline Resistic"

  const handleOpen = () => {
    setShowForm(!showForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("/api/sendmail", {
        subject: subject,
        to: "cercec.general@gmail.com",
        content: emailContent,
      })
      setNotification("Vos remarques ont bien été transmises.")
    } catch (e) {
      console.log("error", e)
      setNotification("Sorry, an error occured. Please try again")
    }
  }

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  return (
    <div
      className={
        showForm ? `feedback-form feedback-form--open` : `feedback-form`
      }
    >
      <span className="tag" onClick={() => handleOpen()}>
        <Feedback />
        Remarques
      </span>
      <div>
        <i className="icon-close" onClick={handleOpen} />
        <h3>Envoyez-nous vos remarques</h3>
        <form onSubmit={handleSubmit}>
          <textarea placeholder="Remarques" onChange={handleChange} />
          <div
            className="g-recaptcha"
            data-sitekey={process.env.GOOGLE_RECAPTCHA_V2_SITE_KEY}
          ></div>
          {!notification && (
            <input
              className="submitFeedback button empty submit"
              type="submit"
              value="Envoyer"
            />
          )}
          <span>{notification}</span>
        </form>
      </div>
    </div>
  )
}
