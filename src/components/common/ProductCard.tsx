import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { getDiscountedPrice, normalizeDiscount } from "@/lib/discounts";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const discount = normalizeDiscount(data.discount);

  // Handle both external URLs and local paths
  const getImageSrc = (src: string) => {
    if (!src) return '/images/placeholder.png';
    // If it's an external URL, return as is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    // If it's a local path, return as is
    return src;
  };

  const imageSrc = getImageSrc(data.srcUrl);
  const isExternalUrl = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');

  return (
    <Link
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="flex flex-col items-start aspect-auto"
    >
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        {isExternalUrl ? (
          // For external URLs, use a regular img tag to avoid Next.js Image optimization issues
          <img
            src={imageSrc}
            width={295}
            height={298}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            alt={data.title}
            loading="lazy"
          />
        ) : (
          // For local images, use Next.js Image component
          <Image
            src={imageSrc}
            width={295}
            height={298}
            className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
            alt={data.title}
            priority
          />
        )}
      </div>
      <strong className="text-black xl:text-xl">{data.title}</strong>
      <div className="flex items-end mb-1 xl:mb-2">
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName="inline-block"
          emptyClassName="fill-gray-50"
          size={19}
          readonly
        />
        <span className="text-black text-xs xl:text-sm ml-[11px] xl:ml-[13px] pb-0.5 xl:pb-0">
          {data.rating.toFixed(1)}
          <span className="text-black/60">/5</span>
        </span>
      </div>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5">
        {discount.percentage > 0 || discount.amount > 0 ? (
          <span className="font-bold text-black text-xl xl:text-2xl">
            {`₹${getDiscountedPrice(data.price, discount)}`}
          </span>
        ) : (
          <span className="font-bold text-black text-xl xl:text-2xl">
            ₹{data.price}
          </span>
        )}
        {discount.percentage > 0 && (
          <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
            ₹{data.price}
          </span>
        )}
        {discount.amount > 0 && (
          <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
            ₹{data.price}
          </span>
        )}
        {discount.percentage > 0 ? (
          <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
            {`-${discount.percentage}%`}
          </span>
        ) : (
          discount.amount > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-₹${discount.amount}`}
            </span>
          )
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
