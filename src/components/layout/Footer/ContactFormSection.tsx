'use client';

import { Button } from '@/components/ui/button';
import InputGroup from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { satoshi } from '@/styles/fonts';
import React, { useState } from 'react';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage('Sending...');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 py-9 md:py-11 px-6 md:px-16 max-w-frame mx-auto bg-black rounded-[20px] mt-10">
      <p
        className={cn([
          satoshi.className,
          'font-bold text-[32px] md:text-[40px] text-white mb-9 md:mb-0',
        ])}
      >
        GET IN TOUCH WITH US
      </p>
      <div className="flex items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-[349px] mx-auto space-y-3"
        >
          <InputGroup className="flex bg-white">
            <InputGroup.Input
              type="text"
              name="name"
              placeholder="Your Name"
              className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </InputGroup>
          <InputGroup className="flex bg-white">
            <InputGroup.Input
              type="email"
              name="email"
              placeholder="Your Email"
              className="bg-transparent placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </InputGroup>
          <textarea
            name="message"
            placeholder="Your Message"
            className="bg-white text-black placeholder:text-black/40 placeholder:text-sm sm:placeholder:text-base rounded-full px-4 py-3 resize-none focus:outline-none"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
          <Button
            variant="secondary"
            className="text-sm sm:text-base font-medium bg-white h-12 rounded-full px-4 py-3 disabled:opacity-70"
            aria-label="Send Message"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          {submitMessage && (
            <p className="text-white text-center mt-2 text-sm">{submitMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactFormSection;
