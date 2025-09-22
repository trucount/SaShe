'use client';

import { Button } from '@/components/ui/button';
import InputGroup from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { satoshi } from '@/styles/fonts';
import Image from 'next/image';
import React, { useState } from 'react';

const NewsLetterSection = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    setMessage('Subscribing...');

    // Abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        signal: controller.signal, // Link the abort signal to the fetch request
      });

      // If the request completes, clear the timeout
      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Success!');
        setEmail('');
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (error: any) {
      // Clear the timeout here as well in case of an error
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        setMessage('Subscription timed out. Please try again.');
      } else {
        setMessage('Failed to subscribe. Please try again later.');
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-black rounded-[20px]">
      <p
        className={cn([
          satoshi.className,
          'font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0',
        ])}
      >
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className="flex items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-[349px] mx-auto"
        >
          <InputGroup className="flex bg-white mb-[14px]">
            <InputGroup.Text>
              <Image
                priority
                src="/icons/envelope.svg"
                height={20}
                width={20}
                alt="email"
                className="min-w-5 min-h-5"
              />
            </InputGroup.Text>
            <InputGroup.Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubscribing}
            />
          </InputGroup>
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-white h-12 rounded-full px-4 py-3 disabled:opacity-70"
            aria-label="Subscribe to Newsletter"
            type="submit"
            disabled={isSubscribing}
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>
          {message && (
            <p className="text-white text-center mt-4 text-sm">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsLetterSection;
