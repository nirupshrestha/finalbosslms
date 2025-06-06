import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  // Handler function for navigation links
  const handleNavClick = () => {
    // Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-[#0f0147] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Details */}
          <div className="space-y-4">
            <Link to="/home" onClick={handleNavClick} className="flex items-center cursor-pointer">
              <img src="/footer.png" alt="Revoc Learning Logo" className="h-10 w-10 mr-4" />
              <h3 className="font-bold text-xl">Revoc Learning</h3>
            </Link>
            <p className="text-sm text-gray-300">
              Empowering learners with high-quality educational content and an
              interactive learning experience.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-sm">revocnepal@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm">+977 9814182323</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">Kupandole, Lalitpur</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link to="/home" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">Home</Link>
              <Link to="/courses" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">All Courses</Link>
              <Link to="/student/courses" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">My Courses</Link>
              <Link to="/aboutus" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">About Us</Link>
              <Link to="/blog" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">Blog</Link>
              <Link to="/faq" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">FAQ</Link>
              <Link to="/contact" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">Contact</Link>
              <Link to="/support" onClick={handleNavClick} className="text-sm hover:text-blue-300 transition">Support</Link>
            </nav>
          </div>

          {/* Social Icons & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300 transition" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition" aria-label="X (formerly Twitter)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.4 3H21L14.6 10.4L22.2 21H15.6L10.8 14.6L5.3 21H2L8.8 13.2L1.8 3H8.6L12.9 8.9L17.4 3Z" />
                </svg>
              </a>

              <a href="#" className="hover:text-blue-300 transition" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-3 py-2 text-sm rounded-l focus:outline-none text-black flex-grow"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-sm font-medium transition"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <div className="mb-2">
            <span>© {currentYear} Revoc Learning. All rights reserved.</span>
          </div>
          <div className="flex justify-center space-x-4">
            <Link to="#" onClick={handleNavClick} className="hover:text-blue-300 transition">Privacy Policy</Link>
            <Link to="#" onClick={handleNavClick} className="hover:text-blue-300 transition">Terms of Service</Link>
            <Link to="#" onClick={handleNavClick} className="hover:text-blue-300 transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;