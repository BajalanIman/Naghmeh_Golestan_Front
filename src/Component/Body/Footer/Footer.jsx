import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-[#F8D41B]">Golestan</h1>
          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            Explore history, culture, and stories that shaped the Middle East.
            Many modern and new experiences.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Explore</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-[#F8D41B] cursor-pointer">Exhibitions</li>
            <li className="hover:text-[#F8D41B] cursor-pointer">Events</li>
            <li className="hover:text-[#F8D41B] cursor-pointer">Workshops</li>
            <li className="hover:text-[#F8D41B] cursor-pointer">Collections</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-[#F8D41B] cursor-pointer">Help Center</li>
            <li className="hover:text-[#F8D41B] cursor-pointer">Contact Us</li>
            <li className="hover:text-[#F8D41B] cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-[#F8D41B] cursor-pointer">Terms</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
          <p className="text-sm text-gray-300 mb-4">
            Get updates about exhibitions and events.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md text-black outline-none"
            />
            <button className="bg-[#F8D41B] text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Golestan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
