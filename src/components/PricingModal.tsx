import React from 'react';
import { X, Star } from 'lucide-react';
import { Plan } from '../types';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (plan: Plan) => void;
}

const plans: Plan[] = [
  { id: 'basic', name: 'Basic', stars: 20, price: 4.99 },
  { id: 'pro', name: 'Pro', stars: 50, price: 9.99 },
  { id: 'premium', name: 'Premium', stars: 120, price: 19.99 },
];

export function PricingModal({ isOpen, onClose, onPurchase }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Purchase Stars</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-center justify-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold">{plan.stars}</span>
              </div>
              <p className="text-3xl font-bold mb-4">${plan.price}</p>
              <button
                onClick={() => onPurchase(plan)}
                className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}