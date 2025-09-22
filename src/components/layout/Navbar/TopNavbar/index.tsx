import { cn } from "@/lib/utils";
import { satoshi } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { FaInfoCircle } from "react-icons/fa";

const data: NavMenu = [
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop#on-sale",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop#new-arrivals",
    children: [],
  },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              satoshi.className,
              "font-bold whitespace-nowrap text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
            ])}
          >
            SaShé
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  {item.type === "MenuItem" && (
                    <MenuItem label={item.label} url={item.url} />
                  )}
                  {item.type === "MenuList" && (
                    <MenuList data={item.children} label={item.label} />
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center">
          <CartBtn />
          <Link href="/about" className="p-1 ml-4">
            <FaInfoCircle className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
