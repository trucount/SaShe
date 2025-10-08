'use client';

import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const [productData, setProductData] = useState<Product | null>(null);
  const [relatedProductData, setRelatedProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          const product = data.products.find(
            (p: Product) => p.id === Number(params.slug[0])
          );
          if (product) {
            setProductData(product);
          } else {
            notFound();
          }
          setRelatedProductData(data.products.slice(8, 12));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [params.slug]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs product={productData} />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}
