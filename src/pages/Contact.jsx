import { useState } from "react";
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({success: null, message: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border border-violet-300 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-violet-300 p-2 rounded"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full border border-violet-300 p-2 rounded h-32" />
        <button
          type="submit"
          className="bg-violet-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>

        {status.message && (
          <div
            className={`text-sm mt-2 ${
              status.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
