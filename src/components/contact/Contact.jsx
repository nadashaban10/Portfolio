import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { LuFileText, LuGithub, LuLinkedin, LuMail, LuMapPin, LuMessageCircle } from "react-icons/lu";
import { profile } from "../../data/site";
import SectionHeading from "../ui/SectionHeading";

const canSend = Boolean(
  import.meta.env.VITE_SERVICE_ID
  && import.meta.env.VITE_TEMPLATE_ID
  && import.meta.env.VITE_PUBLIC_KEY
);

function toastCopy(raw) {
  if (/invalid grant|reconnect your gmail/i.test(raw)) {
    return "Gmail needs to be reconnected in the EmailJS dashboard before this form can send.";
  }
  return raw || "The form did not send. Use the email address instead.";
}

function setHidden(form, name, value) {
  let field = form.querySelector(`input[type="hidden"][name="${name}"]`);
  if (!field) {
    field = document.createElement("input");
    field.type = "hidden";
    field.name = name;
    form.appendChild(field);
  }
  field.value = value;
}

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (!canSend || !form) return;
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();
    setHidden(form, "from_name", name);
    setHidden(form, "user_username", name);
    setHidden(form, "reply_to", email);
    setHidden(form, "from_email", email);
    setHidden(form, "user_message", message);
    setHidden(form, "to_email", profile.email);
    setStatus("sending");
    setToast(null);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form,
        { publicKey: import.meta.env.VITE_PUBLIC_KEY }
      )
      .then(() => {
        setStatus("success");
        form.reset();
        setToast({ kind: "success", text: "Message sent. I will reply by email." });
      })
      .catch((error) => {
        const raw = typeof error?.text === "string" ? error.text : "";
        setStatus("error");
        setToast({ kind: "error", text: toastCopy(raw), detail: raw });
      });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 8000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="If a frontend role is open, I would like to hear about it."
            lede="I am interested in frontend positions, including mid-level ones, and in conversations about product work. Technical collaboration is welcome too."
          />
          <ul className="contact-list">
            <li>
              <LuMail aria-hidden="true" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <LuLinkedin aria-hidden="true" />
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
            <li>
              <LuGithub aria-hidden="true" />
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li>
              <LuMessageCircle aria-hidden="true" />
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp · {profile.whatsappLabel}</a>
            </li>
            <li>
              <LuMapPin aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
            <li>
              <LuFileText aria-hidden="true" />
              {profile.cv ? (
                <a href={profile.cv} download>View CV</a>
              ) : (
                <a href={`mailto:${profile.email}?subject=CV%20request`}>Request CV by email</a>
              )}
            </li>
          </ul>
        </div>

        {canSend ? (
          <form ref={formRef} className="contact-form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="user_name">Name</label>
              <input id="user_name" name="user_name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="user_email">Email</label>
              <input id="user_email" name="user_email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required />
            </div>
            <button className="btn btn-primary btn-still" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p className="form-status" role="status">
              {status === "sending" ? "Sending your message." : ""}
            </p>
          </form>
        ) : (
          <div className="contact-fallback">
            <p>The message form is unavailable in this environment.</p>
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>Email {profile.email}</a>
          </div>
        )}
      </div>
      {toast ? (
        <div className={`toast is-${toast.kind}`} role="alert">
          <p>{toast.text}</p>
          {toast.detail && toast.detail !== toast.text ? <p className="toast-detail">{toast.detail}</p> : null}
          <button type="button" className="text-button" onClick={() => setToast(null)}>Dismiss</button>
        </div>
      ) : null}
    </section>
  );
}
