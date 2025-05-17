import { MessageCircle, Phone, User } from "lucide-react";

function SupportPage() {
  return (
    <div className="bg-white text-gray-800 py-10 px-4 md:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Support</h1>
        <p className="text-lg text-gray-600 mb-10">
          We're here to help! Whether you have a question or need assistance, feel free to contact us using any of the methods below.
        </p>
      </div>

      {/* Support Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        
        {/* Email Support */}
        <div className="flex items-start space-x-4 p-6 border rounded-lg shadow-md hover:shadow-lg transition">
          <MessageCircle className="text-blue-500 w-10 h-10" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">
              Reach us via email at <strong>support@revoc.com</strong>. We aim to respond within 24 hours.
            </p>
            <button
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => window.location.href = "mailto:support@revoc.com"}
            >
              Send Email
            </button>
          </div>
        </div>

        {/* Phone Support */}
        <div className="flex items-start space-x-4 p-6 border rounded-lg shadow-md hover:shadow-lg transition">
          <Phone className="text-blue-500 w-10 h-10" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">
              For urgent assistance, you can reach us at <strong>+123-456-7890</strong>.
            </p>
            <button
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => window.location.href = "tel:+1234567890"}
            >
              Call Us
            </button>
          </div>
        </div>
        
        {/* Live Chat Support */}
        <div className="flex items-start space-x-4 p-6 border rounded-lg shadow-md hover:shadow-lg transition">
          <User className="text-blue-500 w-10 h-10" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Chat Support</h3>
            <p className="text-gray-600 mb-4">
              You can chat with our support team directly via the live chat feature on our website for immediate assistance.
            </p>
            <button
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => window.location.href = "#"} // Replace with actual live chat link
            >
              Start Chat
            </button>
          </div>
        </div>
        
      </div>

      {/* Additional Info Section */}
      <div className="text-left max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
        <p className="text-gray-600 mb-6">
          We are committed to providing the best support possible. If your query requires additional information, please don’t hesitate to reach out using any of the methods above. Our team will be happy to assist you further.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Need More Help?</h2>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Contact Us Now
        </a>
      </div>
    </div>
  );
}

export default SupportPage;
