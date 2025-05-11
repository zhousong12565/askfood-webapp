import React from "react";
import { ShoppingCart } from "lucide-react";

function ProductCards() {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* USANA */}
      <a
        href="https://joyce8684292.usana.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
      >
        <ShoppingCart className="text-blue-600" />
        <div>
          <div className="text-sm font-medium text-gray-900">USANA 官网</div>
          <div className="text-xs text-gray-500">点击进入官网购买 USANA 营养产品</div>
        </div>
      </a>

      {/* 葆婴 */}
      <a
        href="https://shop.baoying.com/shop/spring/enrollment/start/5760437?UNI_TODAY=on&tagCountry=CN&tagLang=ZHS&shopperSource=hub"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
      >
        <ShoppingCart className="text-pink-600" />
        <div>
          <div className="text-sm font-medium text-gray-900">葆婴官网</div>
          <div className="text-xs text-gray-500">注册优惠顾客，立即选购葆婴产品</div>
        </div>
      </a>
    </div>
  );
}

export default ProductCards;
