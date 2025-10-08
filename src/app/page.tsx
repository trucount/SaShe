"use client";

import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { useEffect, useState } from "react";
import { reviewsData } from "@/lib/reviews";

export default function Home() {
  const [newArrivalsData, setNewArrivalsData] = useState<Product[]>([]);
  const [topSellingData, setTopSellingData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setNewArrivalsData(data.products.slice(0, 4));
          setTopSellingData(data.products.slice(4, 8));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <main className="my-[50px] sm:my-[72px]">
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
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
