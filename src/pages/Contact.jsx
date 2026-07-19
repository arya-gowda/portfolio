import { useState } from "react";
import emailjs from '@emailjs/browser';
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

export default function Contact() {
  useDocumentTitle('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState({success: null, message: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot: real users never fill this in, bots typically do.
    if (honeypot) {
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({success: false, message: 'Please fill in all fields.'});
      return;
    }

    emailjs
      .send (
        SERVICE_ID,
        TEMPLATE_ID,
        formData,
        PUBLIC_KEY
      )
      .then(
        () => {
          setStatus({success: true, message: 'Message sent successfully!'});
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          setStatus({success: false, message: 'Failed to send message. Please try again.'});
          console.error(error);
        }
      );
  };

  return (
    <section className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-violet-300 dark:border-violet-700 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-violet-300 dark:border-violet-700 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="What would you like to say?"
            className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-violet-300 dark:border-violet-700 p-2 rounded h-32" />
        </div>

        {/* Honeypot field — hidden from real users, left blank by them but often filled by bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex="-1"
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-violet-500 dark:bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 transition-colors"
        >
          Send
        </button>

        {status.message && (
          <div
            role="status"
            className={`text-sm mt-2 ${
              status.success ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </section>
  );
}
