import React, {useState} from "react";
import axios from "axios"
import {Feedback} from "@material-ui/icons";

export default function FeedbackForm() {
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState("")
  const [notification, setNotification] = useState("")

  let emailContent
  let subject

  emailContent = `<html><head></head><body><p>${message}</p></body></html>`
  subject = 'Nouvelle remarque sur la timeline Resistic'

  const handleOpen = () => {
    setShowForm(!showForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(process.env.GOOGLE_RECAPTCHA, { action: 'submit' });

        const response = await axios.post("/api/sendmail", {
          subject: subject,
          to: "cercec.general@gmail.com",
          content: emailContent,
          recaptchaToken: token,
        });

        if (response.status === 200) {
          setNotification("Vos remarques ont bien été transmises.");
        } else {
          setNotification("Sorry, an error occured. Please try again");
        }

      } catch (e) {
        console.log("error", e);
        setNotification("Sorry, an error occured. Please try again");
      }
    });
  }


  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  return <div className={
    showForm
      ? `feedback-form feedback-form--open`
      : `feedback-form`
  }>
    <span className="tag" onClick={() => handleOpen()}><Feedback/>Remarques</span>
    <div>
      <i className="icon-close" onClick={handleOpen}/>
      <h3>Envoyez-nous vos remarques</h3>
      <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Remarques"
        onChange={handleChange}
      />
        {!notification &&
        <input className="submit" className={'submitFeedback button empty'} type="submit" value="Envoyer"/>
        }
        <span>{notification}</span>
      </form>
    </div>
  </div>
}
