import { useRef, useState } from "react";

import { contactInfo } from "../constants";

const useContactForm = ({ serviceId, templateId, publicKey }) => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) {
      next.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      next.message = "Message must be at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitted) return;
    if (honeypot) return;
    if (!validate()) return;

    if (!serviceId || !templateId || !publicKey) {
      setErrors({
        form: "Contact form is not configured. Please email me directly.",
      });
      return;
    }

    setLoading(true);

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Yahya Salhi",
          from_email: form.email,
          to_email: contactInfo.email,
          message: form.message,
        },
        publicKey
      );
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      if (error.status === 422) {
        setErrors({
          form: "Template configuration issue. Please email me directly.",
        });
      } else if (error.status === 401 || error.status === 403 || error.status === 412) {
        setErrors({
          form: "Email service authentication error. Please email me directly.",
        });
      } else {
        setErrors({
          form: "Something went wrong. Please try again or email me directly.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formRef,
    form,
    errors,
    loading,
    submitted,
    honeypot,
    setHoneypot,
    handleChange,
    handleSubmit,
  };
};

export default useContactForm;
