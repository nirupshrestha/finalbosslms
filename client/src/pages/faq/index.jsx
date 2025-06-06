import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
      >
        <span>{question}</span>
        <span className="text-blue-600">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "What is Revoc Learning?",
          answer: "Revoc Learning is a comprehensive learning management system designed to streamline online education, providing tools for educators and students to create, deliver, and manage learning experiences effectively."
        },
        {
          question: "How do I create an account?",
          answer: "Creating an account is simple. Click on the 'Sign Up' button on our homepage, choose your account type (Student or Instructor), fill in your details, and verify your email address."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes! We offer a 14-day free trial for all users. You can explore full features of our platform without any commitment."
        }
      ]
    },
    {
      title: "Course Management",
      faqs: [
        {
          question: "How can I create a course?",
          answer: "Instructors can create a course by navigating to the 'Create Course' section, adding course details, uploading content, and setting up modules and assessments."
        },
        {
          question: "Can I track student progress?",
          answer: "Absolutely! Our platform provides comprehensive analytics and progress tracking tools. You can view student engagement, completion rates, and individual performance metrics."
        },
        {
          question: "What types of content can I upload?",
          answer: "Revoc Learning supports multiple content types including PDF documents, video lectures, presentations, quizzes, assignments, and interactive learning modules."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "What devices are supported?",
          answer: "Revoc Learning is fully responsive and works on desktops, laptops, tablets, and smartphones. Access your courses from any device with an internet connection."
        },
        {
          question: "How secure is my data?",
          answer: "We prioritize data security with end-to-end encryption, regular security audits, and compliance with international data protection regulations."
        },
        {
          question: "What if I need additional support?",
          answer: "We offer multiple support channels including live chat, email support, comprehensive documentation, and a community forum for users to help each other."
        }
      ]
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input 
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* FAQ Categories */}
      <div className="max-w-4xl mx-auto">
        {filteredFAQs.map((category, catIndex) => (
          <div key={catIndex} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              {category.title}
            </h2>
            {category.faqs.map((faq, faqIndex) => (
              <FAQItem 
                key={faqIndex}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        ))}

        {filteredFAQs.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No FAQs found matching your search.
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6">
          Our support team is here to help you!
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/contact" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
          {/* <a 
            href="/help" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Help Center
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;