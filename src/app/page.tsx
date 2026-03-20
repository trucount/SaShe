"use client";

import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";
import { useEffect, useState } from "react";

export default function Home() {
  const [newArrivalsData, setNewArrivalsData] = useState<Product[]>([]);
  const [topSellingData, setTopSellingData] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const [productsResponse, reviewsResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/reviews'),
        ]);

        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          const products = productsData.products || [];
          const sortedByRating = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
          const shuffledProducts = [...products];

          for (let index = shuffledProducts.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffledProducts[index], shuffledProducts[randomIndex]] = [
              shuffledProducts[randomIndex],
              shuffledProducts[index],
            ];
          }

          setNewArrivalsData(sortedByRating.slice(0, 4));
          setTopSellingData(shuffledProducts.slice(0, 4));
        }

        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
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
            <Reviews data={reviews} />
          </>
        )}
      </main>
    </>
  );
}
