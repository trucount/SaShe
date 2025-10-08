import ProductListSec from "@/components/common/ProductListSec";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "Framed Acrylic Portrait",
    description: "This is a beautiful framed acrylic portrait.",
    srcUrl: "/images/ChatGPT Image Sep 21, 2025, 12_26_28 PM.png",
    gallery: ["/images/ChatGPT Image Sep 21, 2025, 12_26_28 PM.png"],
    price: 4999,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    specifications: [
      { label: "Material composition", value: "100% Acrylic" },
      { label: "Care instructions", value: "Wipe with a soft cloth" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Portrait" },
    ],
  },
  {
    id: 2,
    title: "Red Bull Racing RB20 Painting",
    description: "A stunning painting of the Red Bull Racing RB20.",
    srcUrl: "/images/ChatGPT Image Sep 21, 2025, 12_30_32 PM.png",
    gallery: ["/images/ChatGPT Image Sep 21, 2025, 12_30_32 PM.png"],
    price: 8000,
    discount: {
      amount: 0,
      percentage: 10,
    },
    rating: 3.5,
    specifications: [
      { label: "Material composition", value: "Canvas" },
      { label: "Care instructions", value: "Handle with care" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Racing Car" },
    ],
  },
  {
    id: 3,
    title: "Marble Luxe Roman Wall Clock",
    description: "An elegant Marble Luxe Roman wall clock.",
    srcUrl: "/images/IMG-20250916-WA0001.jpg",
    gallery: ["/images/IMG-20250916-WA0001.jpg"],
    price: 10000,
    discount: {
      amount: 0,
      percentage: 10,
    },
    rating: 4.5,
    specifications: [
      { label: "Material composition", value: "Resine, Metal" },
      { label: "Care instructions", value: "Wipe clean" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Roman Numerals" },
    ],
  },
  {
    id: 4,
    title: "Flower Resine Art",
    description: "Creative and colorful flower resin art.",
    srcUrl: "/images/IMG-20250921-WA0019.jpg",
    gallery: ["/images/IMG-20250921-WA0019.jpg"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
    specifications: [
      { label: "Material composition", value: "Resin, Dried Flowers" },
      { label: "Care instructions", value: "Keep away from direct sunlight" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Floral" },
    ],
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "Petals and Flowers",
    description: "Beautiful petals and flowers design.",
    srcUrl: "/images/IMG-20250921-WA0020.jpg",
    gallery: ["/images/IMG-20250921-WA0020.jpg"],
    price: 232,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
    specifications: [
      { label: "Material composition", value: "100% Cotton" },
      { label: "Care instructions", value: "Machine wash cold" },
      { label: "Fit type", value: "Classic Fit" },
      { label: "Pattern", value: "Floral" },
    ],
  },
  {
    id: 6,
    title: "Courage Graphic",
    description: "A graphic with a message of courage.",
    srcUrl: "/images/IMG-20250921-WA0018.jpg",
    gallery: ["/images/IMG-20250921-WA0018.jpg"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
    specifications: [
      { label: "Material composition", value: "100% Cotton" },
      { label: "Care instructions", value: "Machine wash warm, tumble dry" },
      { label: "Fit type", value: "Classic Fit" },
      { label: "Pattern", value: "Graphic" },
    ],
  },
  {
    id: 7,
    title: "Resine Plate",
    description: "A unique and stylish resin plate.",
    srcUrl: "/images/IMG-20250921-WA0017.jpg",
    gallery: ["/images/IMG-20250921-WA0017.jpg"],
    price: 80,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.0,
    specifications: [
      { label: "Material composition", value: "Resin" },
      { label: "Care instructions", value: "Hand wash only" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Abstract" },
    ],
  },
  {
    id: 8,
    title: "Golden N",
    description: "A golden 'N' for a touch of class.",
    srcUrl: "/images/IMG-20250921-WA0016.jpg",
    gallery: ["/images/IMG-20250921-WA0016.jpg"],
    price: 210,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    specifications: [
      { label: "Material composition", value: "Metal" },
      { label: "Care instructions", value: "Polish with a soft cloth" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Letter" },
    ],
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "Green T",
    description: "A vibrant green 'T' design.",
    srcUrl: "/images/IMG-20250921-WA0015.jpg",
    gallery: ["/images/IMG-20250921-WA0015.jpg"],
    price: 242,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.0,
    specifications: [
      { label: "Material composition", value: "100% Cotton" },
      { label: "Care instructions", value: "Machine wash warm, tumble dry" },
      { label: "Fit type", value: "Classic Fit" },
      { label: "Pattern", value: "Solid" },
    ],
  },
  {
    id: 13,
    title: "Sunny R",
    description: "A sunny 'R' to brighten your day.",
    srcUrl: "/images/IMG-20250921-WA0014.jpg",
    gallery: ["/images/IMG-20250921-WA0014.jpg"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.5,
    specifications: [
      { label: "Material composition", value: "100% Cotton" },
      { label: "Care instructions", value: "Machine wash warm, tumble dry" },
      { label: "Fit type", value: "Classic Fit" },
      { label: "Pattern", value: "Letter" },
    ],
  },
  {
    id: 14,
    title: "Resine Dimond",
    description: "A sparkling resin diamond.",
    srcUrl: "/images/IMG-20250921-WA0006.jpg",
    gallery: ["/images/IMG-20250921-WA0006.jpg"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    specifications: [
      { label: "Material composition", value: "Resin" },
      { label: "Care instructions", value: "Handle with care" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Diamond" },
    ],
  },
  {
    id: 15,
    title: "Resine Bnagles",
    description: "Hand-crafted resin bangles.",
    srcUrl: "/images/IMG-20250921-WA0008.jpg",
    gallery: ["/images/IMG-20250921-WA0008.jpg"],
    price: 150,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 5.0,
    specifications: [
      { label: "Material composition", value: "Resin" },
      { label: "Care instructions", value: "Avoid contact with harsh chemicals" },
      { label: "Fit type", value: "N/A" },
      { label: "Pattern", value: "Solid" },
    ],
  },
];

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content:
      '"Finding clothes that align with my personal style used to be a challenge until I discovered SaShé. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and style of the clothes I received from SaShé. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."`,
    rating: 5,
    date: "August 19, 2023",
  },
];

export default function Home() {
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
