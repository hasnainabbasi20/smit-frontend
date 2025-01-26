import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p>
              Saylai Web is a leading platform that connects people through creative solutions and innovative designs. We strive to deliver the best digital experiences for our users.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#home" className="hover:text-gray-400">Home</a></li>
              <li><a href="#services" className="hover:text-gray-400">Services</a></li>
              <li><a href="#about" className="hover:text-gray-400">About</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: <a href="mailto:support@saylaiweb.com" className="hover:text-gray-400">support@saylaiweb.com</a></p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Saylai Street, City, Country</p>
          </div>

          {/* Section 4: Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p>&copy; 2025 Saylai Web. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
