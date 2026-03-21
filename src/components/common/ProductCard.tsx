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

  // ✅ Safe image handler (supports srcUrl + gallery + fallback)
  const isValid = (url?: string) =>
    url && (url.startsWith("http") || url.startsWith("/"));

  const image = isValid(data.srcUrl)
    ? data.srcUrl
    : isValid(data.gallery?.[0])
    ? data.gallery[0]
    : "/placeholder.png";

  return (
    <Link
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="flex flex-col items-start aspect-auto"
    >
      {/* Image */}
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <Image
          src={image}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.title}
          priority
          unoptimized
        />
      </div>

      {/* Title */}
      <strong className="text-black xl:text-xl">{data.title}</strong>

      {/* Rating */}
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

      {/* Price */}
      <div className="flex items-center space-x-[5px] xl:space-x-2.5">
        {/* Final Price */}
        <span className="font-bold text-black text-xl xl:text-2xl">
          {discount.percentage > 0 || discount.amount > 0
            ? `₹${getDiscountedPrice(data.price, discount)}`
            : `₹${data.price}`}
        </span>

        {/* Original Price (fixed duplicate bug) */}
        {(discount.percentage > 0 || discount.amount > 0) && (
          <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
            ₹{data.price}
          </span>
        )}

        {/* Discount Badge */}
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
