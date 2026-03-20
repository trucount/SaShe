'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const OrderConfirmationPage = () => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your order is placed!</h1>
        <p className="text-gray-600 mb-4">Our team will contact you soon to confirm your order.</p>
        <div className="text-sm text-gray-500">
          Redirecting to the homepage in <span className="font-semibold">{countdown}</span> seconds...
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmationPage;
