import React from "react";
import { ShoppingCart } from "lucide-react";
import usanaLogo from "../assets/usana-logo.jpg";
import babycareLogo from "../assets/babycare-logo.jpg";

export default function ProductButtons() {
  const buttonStyle =
    "flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition w-full md:w-[22rem]";

  const labelStyle = "font-semibold text-black";

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8">
      {/* USANA 官网 */}
      <a
        href="https://joyce8684292.usana.com"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyle}
      >
        <ShoppingCart className="text-gray-800" />
        <img
          src={usanaLogo}
          alt="USANA Logo"
          className="w-12 h-12 object-contain rounded-full"
        />
        <div>
          <div className={labelStyle}>USANA 官网</div>
          <div className="text-sm text-gray-500">点击进入 USANA 官网购买营养产品</div>
        </div>
      </a>

      {/* 葆婴官网 */}
      <a
        href="https://shop.baoying.com/shop/spring/enrollment/start/5760437?UNI_TODAY=on&tagCountry=CN&tagLang=ZHS&shopperSource=hub"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyle}
      >
        <ShoppingCart className="text-gray-800" />
        <img
          src={babycareLogo}
          alt="葆婴 Logo"
          className="w-12 h-12 object-contain rounded-full"
        />
        <div>
          <div className={labelStyle}>葆婴官网</div>
          <div className="text-sm text-gray-500">注册优惠顾客 - 进入葆婴官网购买</div>
        </div>
      </a>
    </div>
  );
}
