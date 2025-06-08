import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { generateTextResume, generateHTMLResume } from "../utils/resume";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!form.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!form.message.trim()) {
      toast.error("Please enter your message.");
      return;
    }

    if (form.message.trim().length < 10) {
      toast.error("Please enter a message with at least 10 characters.");
      return;
    }

    setLoading(true);

    // EmailJS configuration - Real email functionality enabled
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_p4clatt",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_default",
        {
          from_name: form.name,
          to_name: "Yahya Salhi",
          from_email: form.email,
          to_email: "pcclub10@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "default_key"
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            "Thank you! Your message has been sent successfully. I will get back to you as soon as possible."
          );

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);

          // Provide helpful error messages based on error type
          if (error.status === 422) {
            toast.error(
              "Email template configuration issue detected. Your message couldn't be sent due to a template setup problem. Please contact me directly at pcclub10@gmail.com or try again later."
            );
          } else if (error.status === 400) {
            toast.error(
              "There was an issue with the form data. Please check all fields and try again."
            );
          } else if (error.status === 401) {
            toast.error(
              "Email service authentication error. Please contact me directly at pcclub10@gmail.com"
            );
          } else if (error.status === 403) {
            toast.error(
              "Email service access denied. Please contact me directly at pcclub10@gmail.com"
            );
          } else {
            toast.error(
              "Something went wrong while sending your message. Please try again or contact me directly at pcclub10@gmail.com"
            );
          }
        }
      );
  };

  return (
    <div className="xl:mt-12 max-w-7xl mx-auto">
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1)}
        className="bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="mt-4">
          <p className="text-secondary text-[17px] leading-[30px]">
            I'm always open to discussing new opportunities, collaborations, or
            just having a chat about technology. Feel free to reach out through
            the form below or connect with me on social media.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition-colors flex items-center gap-2"
          >
            <span>✈️</span>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        {/* Contact Information */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📧</span>
            </div>
            <div>
              <p className="text-white font-medium">Email</p>
              <p className="text-secondary">pcclub10@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📱</span>
            </div>
            <div>
              <p className="text-white font-medium">Phone</p>
              <p className="text-secondary">+216 20 089 732</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-tertiary rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📍</span>
            </div>
            <div>
              <p className="text-white font-medium">Location</p>
              <p className="text-secondary">Tunisia</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12">
          <h4 className="text-white font-bold text-[20px] mb-6">
            Connect with me
          </h4>
          <div className="flex gap-6">
            <a
              href="https://github.com/yahya-salhi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center hover:bg-[#915EFF] transition-colors group"
              title="GitHub Profile"
            >
              <span className="text-white text-xl group-hover:scale-110 transition-transform">
                🐙
              </span>
            </a>
            <a
              href="https://linkedin.com/in/salhi-yahya-365176168"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center hover:bg-[#0077B5] transition-colors group"
              title="LinkedIn Profile"
            >
              <span className="text-white text-xl group-hover:scale-110 transition-transform">
                💼
              </span>
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01fde061103dd6cd24"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center hover:bg-[#14A800] transition-colors group"
              title="Upwork Profile"
            >
              <span className="text-white text-xl group-hover:scale-110 transition-transform">
                💚
              </span>
            </a>
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="mt-12">
          <h4 className="text-white font-bold text-[20px] mb-6">
            Professional Documents
          </h4>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                generateHTMLResume();
              }}
              className="bg-tertiary py-3 px-6 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition-colors flex items-center gap-2"
            >
              <span>📄</span>
              View Resume (PDF)
            </button>
            <button
              onClick={() => {
                generateTextResume();
              }}
              className="bg-tertiary py-3 px-6 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition-colors flex items-center gap-2"
            >
              <span>📝</span>
              Download Text Resume
            </button>
            <button
              onClick={() => {
                window.open("https://github.com/yahya-salhi", "_blank");
              }}
              className="bg-tertiary py-3 px-6 rounded-xl outline-none text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition-colors flex items-center gap-2"
            >
              <span>💻</span>
              View Portfolio
            </button>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-12 p-6 bg-tertiary rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h4 className="text-white font-bold text-[18px]">
              Available for Work
            </h4>
          </div>
          <p className="text-secondary text-[14px]">
            I&apos;m currently available for freelance projects and full-time
            opportunities. Let&apos;s discuss how I can help bring your ideas to
            life!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
