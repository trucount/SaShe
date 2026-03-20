"use client";

import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { useEffect, useState } from "react";

export default function Home() {
  const [newArrivalsData, setNewArrivalsData] = useState<Product[]>([]);
  const [topSellingData, setTopSellingData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          const products = data.products || [];
          
          // Smart arrangement: Sort by rating (descending) and discount (descending)
          const sortedByRating = [...products].sort((a, b) => {
            const ratingDiff = (b.rating || 0) - (a.rating || 0);
            if (ratingDiff !== 0) return ratingDiff;
            return (b.discount?.percentage || 0) - (a.discount?.percentage || 0);
          });

          // Split into new arrivals (top rated) and top selling (highest discount)
          setNewArrivalsData(sortedByRating.slice(0, 4));
          setTopSellingData(sortedByRating.slice(4, 8));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="my-[50px] sm:my-[72px]">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : (
          <>
            <ProductListSec
              title="NEW ARRIVALS"
              data={newArrivalsData}
              viewAllLink="/shop#new-arrivals"
            />
            <div className="max-w-frame mx-auto px-4 xl:px-0">
              <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
            </div>
            <div className="mb-[50px] sm:mb-20">
              <ProductListSec
                title="top selling"
                data={topSellingData}
                viewAllLink="/shop#top-selling"
              />
            </div>
            <Reviews />
          </>
        )}
      </main>
    </>
  );
}
