import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessProps {
  transactionId: string;
  stars: number;
  onClose: () => void;
}

export function PaymentSuccess({ transactionId, stars, onClose }: PaymentSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-300 mb-4">
            Thank you for your purchase. {stars} stars have been added to your account.
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Transaction ID: {transactionId}
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Continue Editing
          </button>
        </div>
      </div>
    </div>
  );
}