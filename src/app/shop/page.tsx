'use client';

import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import ProductCard from "@/components/common/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          const allProducts = data.products || [];
          
          // Smart arrangement: Sort by rating (descending) then by discount (descending)
          const sortedProducts = [...allProducts].sort((a, b) => {
            const ratingDiff = (b.rating || 0) - (a.rating || 0);
            if (ratingDiff !== 0) return ratingDiff;
            return (b.discount?.percentage || 0) - (a.discount?.percentage || 0);
          });
          
          setProducts(sortedProducts);
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
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex items-start">
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">All Products</h1>
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {products.length} Products
                </span>
              </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-600 text-lg">No products available at the moment.</p>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
