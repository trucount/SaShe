import { Discount } from "@/types/product.types";

export const normalizeDiscount = (discount?: Partial<Discount> | null): Discount => ({
  amount: typeof discount?.amount === "number" && Number.isFinite(discount.amount) ? discount.amount : 0,
  percentage:
    typeof discount?.percentage === "number" && Number.isFinite(discount.percentage)
      ? discount.percentage
      : 0,
});

export const getDiscountedPrice = (price: number, discount?: Partial<Discount> | null): number => {
  const normalizedDiscount = normalizeDiscount(discount);

  if (normalizedDiscount.percentage > 0) {
    return Math.round(price - (price * normalizedDiscount.percentage) / 100);
  }

  if (normalizedDiscount.amount > 0) {
    return Math.round(price - normalizedDiscount.amount);
  }

  return price;
};
