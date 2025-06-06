import React, { useState } from 'react';
import { MapPin, Mail, Phone } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white text-gray-800 py-10 px-4 md:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you. Reach out for questions, support, or collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="flex items-start p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <MapPin className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Our Location</h3>
              <p className="text-gray-600">Revoc Nepal Pvt Ltd</p>
              <p className="text-gray-600">Kupandole, Lalitpur</p>
            </div>
          </div>

          <div className="flex items-start p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <Mail className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Email Us</h3>
              <p className="text-gray-600">revocnepal@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <Phone className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p className="text-gray-600">+977 9814182323</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Send a Message</h2>
          {submitSuccess && (
            <div className="mb-4 text-green-600 text-center font-medium">
              Message sent successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your Message"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        {/* Google Map Embed
        <div className="max-w-5xl mx-auto mt-10 shadow-lg rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.005566738035!2d85.31233927453495!3d27.686222826424547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000e4bbf35%3A0xadfb12f7d9c3c234!2sRevoc%20Learning!5e0!3m2!1sen!2snp!4v1748517234511!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}

      </div>
    </div>
  );
};

export default ContactPage;
