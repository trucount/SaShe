"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import ReviewCard from "@/components/common/ReviewCard";
import { Review } from "@/types/review.types";

type ReviewsProps = { data?: Review[] };

const Reviews = ({ data = [] }: ReviewsProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isClient = useIsClient();

  React.useEffect(() => {
    if (!api || data.length === 0) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, data.length]);

  if (!isClient) return null;

  return (
    <section className="overflow-hidden">
      <motion.div
        initial={{ x: "100px", opacity: 0 }}
        whileInView={{ x: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative flex items-end sm:items-center max-w-frame mx-auto mb-6 md:mb-10 px-4 xl:px-0">
          <motion.h2
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={cn([
              integralCF.className,
              "text-[32px] leading-[36px] md:text-5xl capitalize mr-auto",
            ])}
          >
            OUR HAPPY CUSTOMERS
          </motion.h2>
          {data.length > 0 && (
            <div className="flex items-center space-x-1 ml-2">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!api?.canScrollPrev()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl transition disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous reviews"
              >
                <FaArrowLeft />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!api?.canScrollNext()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl transition disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next reviews"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>

        {data.length === 0 ? (
          <div className="max-w-frame mx-auto px-4 xl:px-0 pb-4 text-left text-black/60">
            Customer reviews will appear here once they are available.
          </div>
        ) : (
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="relative w-full mb-6 md:mb-9"
          >
            <CarouselContent>
              {data.map((review, index) => (
                <CarouselItem
                  key={review.id}
                  className="w-full max-w-[358px] sm:max-w-[400px] pl-5"
                >
                  <ReviewCard
                    className="h-full"
                    data={review}
                    blurChild={
                      data.length >= 6 && (
                        <div
                          className={cn([
                            isDesktop
                              ? (current + 1 === count
                                  ? 0
                                  : current + 1 > count
                                  ? 1
                                  : current + 1) === index &&
                                "backdrop-blur-[2px]"
                              : (current === count ? 0 : current) === index &&
                                "backdrop-blur-[2px]",
                            isDesktop
                              ? (current === 1
                                  ? count - 2
                                  : current === 2
                                  ? count - 1
                                  : current - 3) === index &&
                                "backdrop-blur-[2px]"
                              : (current === 1
                                  ? count - 1
                                  : current === 2
                                  ? 0
                                  : current - 2) === index &&
                                "backdrop-blur-[2px]",
                            "absolute bg-white/10 right-0 top-0 h-full w-full z-10",
                          ])}
                        />
                      )
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </motion.div>
    </section>
  );
};

export default Reviews;
