import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1B6269] text[#1B6269]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="text-[#E4F8F7]">
          <h1 className="text-2xl font-bold">Golestan Cultural Hun</h1>
          <p className="text-sm mt-4 leading-relaxed">
            Explore history, culture, and stories that shaped the Middle East.
            Many modern and new experiences.
          </p>
        </div>

        {/* Links */}
        <div className="text-[#E4F8F7]">
          <h2 className="text-lg font-semibold mb-4">Explore</h2>
          <ul className="space-y-2">
            {/* <li className="hover:text-[#ECEAD3] cursor-pointer">Exhibitions</li> */}
            <Link to="/workshops">
              <li className="hover:text-[#ECEAD3] cursor-pointer">Workshops</li>
            </Link>
            <Link to="/courses">
              <li className="hover:text-[#ECEAD3] cursor-pointer">Courses</li>
            </Link>
            <li className="hover:text-[#ECEAD3] cursor-pointer">Events</li>
            <li className="hover:text-[#ECEAD3] cursor-pointer">News</li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-[#E4F8F7]">
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <ul className="space-y-2">
            <li className="hover:text-[#ECEAD3] cursor-pointer">Help Center</li>
            <li className="hover:text-[#ECEAD3] cursor-pointer">Contact Us</li>
            <li className="hover:text-[#ECEAD3] cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-[#E4F8F7] cursor-pointer">Terms</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg text-[#E4F8F7] font-semibold mb-4">
            Newsletter
          </h2>
          <p className="text-sm text-[#E4F8F7] mb-4">
            Get updates about exhibitions and events.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md outline-none"
            />
            <button className="bg-[#E4F8F7] px-4 py-2 rounded-md font-semibold hover:bg-yellow-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-[#E4F8F7]">
        © {new Date().getFullYear()} Golestan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
