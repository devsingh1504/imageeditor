import React from "react";
import { Image, LogIn, UserPlus, Star } from "lucide-react";
import { User } from "../types";

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onSignup: () => void;
  onOpenPricing: () => void;
}

export function Navbar({
  user,
  onLogin,
  onSignup,
  onOpenPricing,
}: NavbarProps) {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <Image className="w-6 h-6" />
            <span className="text-xl font-bold">CanvasImage</span>
          </div>

          {/* Navigation items */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{user.stars} stars</span>
                  <span className="text-sm text-gray-400">
                    ({user.editsRemaining} edits left)
                  </span>
                </div>
                <button
                  onClick={onOpenPricing}
                  className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700"
                >
                  Buy Stars
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={onSignup}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
