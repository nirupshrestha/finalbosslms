import React, { useState } from 'react';

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 mb-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl max-w-3xl mx-auto">
          We'd love to hear from you! Reach out for inquiries, support, or feedback.
        </p>
      </div>

      {/* Contact Container */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Contact Info Section */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 group-hover:w-2 transition-all duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Our Location</h3>
            </div>
            <p className="text-gray-600">Learn Key Education Pvt Ltd</p>
            <p className="text-gray-600">Kathmandu, Nepal</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 group-hover:w-2 transition-all duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
            </div>
            <p className="text-gray-600">info@revoclearning.com</p>
            <p className="text-gray-600">support@revoclearning.com</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 group-hover:w-2 transition-all duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
            </div>
            <p className="text-gray-600">+977 1 1234567</p>
            <p className="text-gray-600">+977 9801234567</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 relative pb-2">
            Send Us a Message
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
          </h2>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {/* Name Field */}
            <div className="relative mb-8">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-0 pt-4 pb-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 peer"
              />
              <label className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform peer-focus:-translate-y-5 peer-focus:text-blue-500 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm peer-valid:text-blue-500">
                Your Name
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 peer-focus:w-full"></span>
            </div>

            {/* Email Field */}
            <div className="relative mb-8">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-0 pt-4 pb-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 peer"
              />
              <label className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform peer-focus:-translate-y-5 peer-focus:text-blue-500 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm peer-valid:text-blue-500">
                Your Email
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 peer-focus:w-full"></span>
            </div>

            {/* Subject Field */}
            <div className="relative mb-8">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-0 pt-4 pb-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 peer"
              />
              <label className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform peer-focus:-translate-y-5 peer-focus:text-blue-500 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm peer-valid:text-blue-500">
                Subject
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 peer-focus:w-full"></span>
            </div>

            {/* Message Field */}
            <div className="relative mb-8">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-0 pt-4 pb-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 peer h-32"
                rows="4"
              ></textarea>
              <label className="absolute left-0 top-4 text-gray-500 transition-all duration-300 transform peer-focus:-translate-y-5 peer-focus:text-blue-500 peer-focus:text-sm peer-valid:-translate-y-5 peer-valid:text-sm peer-valid:text-blue-500">
                Your Message
              </label>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 peer-focus:w-full"></span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-full font-medium shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center relative pb-2">
          Find Us on Map
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
        </h2>
        
        <div className="rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.312804178123!2d85.3358746!3d27.6996643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19002d629f5d%3A0xcb090a61268a38d3!2sLearn%20Key%20Education%20Pvt%20ltd!5e0!3m2!1sen!2snp!4v1718123456789!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
            title="Revoc Learning Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;