import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import { newArrivalsData, relatedProductData, topSellingData } from "../page";
import ProductCard from "@/components/common/ProductCard";

export default function ShopPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex items-start">
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing Top Products
                </span>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {[
                ...relatedProductData,
                ...newArrivalsData,
                ...topSellingData,
              ].map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}