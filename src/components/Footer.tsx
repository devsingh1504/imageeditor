import React from 'react';
import { Image, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image className="w-6 h-6" />
              <span className="text-xl font-bold">ImageText Pro</span>
            </div>
            <p className="text-gray-400">
              Create beautiful text overlays for your images with our professional editor.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="mailto:support@imagetext.pro"
                className="flex items-center space-x-2 text-gray-400 hover:text-white"
              >
                <Mail className="w-4 h-4" />
                <span>support@imagetext.pro</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-gray-400 hover:text-white"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ImageText Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}