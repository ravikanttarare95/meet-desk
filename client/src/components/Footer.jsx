import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div
        className={`${
          window.location.pathname === "/" ? "max-w-7xl" : "max-w-3xl"
        } mx-auto px-6 py-10`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-violet-600 mb-2">MeetDesk</h3>
            <p className="text-gray-600 text-sm">
              Simple, fast, and modern appointment scheduling for professionals.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-violet-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/authenticate"
                  className="hover:text-violet-600 transition"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MeetDesk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
