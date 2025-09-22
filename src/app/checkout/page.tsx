'use client';

import BreadcrumbCart from '@/components/cart-page/BreadcrumbCart';
import { Button } from '@/components/ui/button';
import InputGroup from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import React, { useState, useEffect } from 'react';
import { RootState } from '@/lib/store';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { clearCart } from '@/lib/features/carts/cartsSlice';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    whatsappNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (isLoading || !cart || cart.items.length === 0) return;

    setIsLoading(true);
    const orderId = Math.random().toString().slice(2, 12);
    const order = {
      orderId,
      ...formData,
      products: cart.items,
      totalPrice,
      adjustedTotalPrice,
    };

    try {
      const response = await fetch('/api/save-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        dispatch(clearCart());
        router.push('/order-confirmation');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      alert('An error occurred while placing the order.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <BreadcrumbCart />
        <h2
          className={cn([
            integralCF.className,
            'font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6',
          ])}
        >
          Checkout
        </h2>
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
          <div className="w-full p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
            <h6 className="text-xl md:text-2xl font-bold text-black">
              Shipping Information
            </h6>
            <div className="flex flex-col space-y-5">
              <InputGroup className="bg-[#F0F0F0]">
                <InputGroup.Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="bg-transparent placeholder:text-black/40"
                  onChange={handleInputChange}
                  value={formData.fullName}
                />
              </InputGroup>
              <InputGroup className="bg-[#F0F0F0]">
                <InputGroup.Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="bg-transparent placeholder:text-black/40"
                  onChange={handleInputChange}
                  value={formData.phoneNumber}
                />
              </InputGroup>
              <InputGroup className="bg-[#F0F0F0]">
                <InputGroup.Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="bg-transparent placeholder:text-black/40"
                  onChange={handleInputChange}
                  value={formData.address}
                />
              </InputGroup>
              <InputGroup className="bg-[#F0F0F0]">
                <InputGroup.Input
                  type="text"
                  name="whatsappNumber"
                  placeholder="WhatsApp Number"
                  className="bg-transparent placeholder:text-black/40"
                  onChange={handleInputChange}
                  value={formData.whatsappNumber}
                />
              </InputGroup>
            </div>
          </div>
          <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
            <h6 className="text-xl md:text-2xl font-bold text-black">
              Order Summary
            </h6>
            <div className="flex flex-col space-y-5">
              <div className="flex items-center justify-between">
                <span className="md:text-xl text-black/60">Subtotal</span>
                <span className="md:text-xl font-bold">₹{totalPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="md:text-xl text-black/60">
                  Discount (-
                  {cart && totalPrice > 0
                    ? Math.round(
                        ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                      )
                    : 0}
                  %)
                </span>
                <span className="md:text-xl font-bold text-red-600">
                  -₹{cart && Math.round(totalPrice - adjustedTotalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="md:text-xl text-black/60">
                  Delivery Fee
                </span>
                <span className="md:text-xl font-bold">Free</span>
              </div>
              <hr className="border-t-black/10" />
              <div className="flex items-center justify-between">
                <span className="md:text-xl text-black">Total</span>
                <span className="text-xl md:text-2xl font-bold">
                  ₹{cart && Math.round(adjustedTotalPrice)}
                </span>
              </div>
            </div>
            <Button
              type="button"
              className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
              onClick={handleSubmit}
              disabled={isLoading || !cart || cart.items.length === 0}
            >
              {isLoading ? 'Placing Order...' : 'Submit Order'}
            </Button>
            <p className="text-xs text-center text-black/60">
              Currently we only accept payments after delivery and your customer
              partner will soon confirm you order
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
