import React, { useState } from 'react';

const BlogPost = ({ title, date, excerpt, link }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm mb-2">{date}</p>
    <p className="text-gray-600 mb-4">{excerpt}</p>
    <a 
      href={link} 
      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
    >
      Read More →
    </a>
  </div>
);

const BlogPage = () => {
  const [email, setEmail] = useState('');

  const blogPosts = [
    {
      title: "Transforming Education with AI-Powered Learning",
      date: "May 12, 2025",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we learn and teach. Our latest research explores the cutting-edge technologies that are making personalized education a reality.",
      link: "/blog/ai-powered-learning"
    },
    {
      title: "Effective Remote Learning Strategies",
      date: "April 28, 2025",
      excerpt: "Explore proven techniques for creating engaging and effective online learning experiences. From interactive tools to student motivation strategies, we've got you covered.",
      link: "/blog/remote-learning-strategies"
    },
    {
      title: "The Future of Collaborative Learning Platforms",
      date: "April 15, 2025",
      excerpt: "Learn how modern learning management systems are breaking down barriers and creating new opportunities for collaborative education across the globe.",
      link: "/blog/collaborative-learning"
    }
  ];

  const blogCategories = [
    "Technology in Education",
    "Learning Strategies", 
    "Online Course Design",
    "Student Success",
    "Instructor Resources",
    "EdTech Trends"
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Revoc Learning Blog
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Blog Posts Column */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Latest Articles
          </h2>
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* Blog Categories */}
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Blog Categories
            </h3>
            <ul className="space-y-2">
              {blogCategories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={`/blog/category/${category.toLowerCase().replace(/ /g, '-')}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Subscribe to Our Newsletter
            </h3>
            <div className="space-y-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleEmailSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      
      </div>
    
  );
};

export default BlogPage;