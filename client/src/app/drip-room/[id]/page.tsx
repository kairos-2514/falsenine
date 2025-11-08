"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useNavigation, ROUTES, buildDripRoomRoute } from "@/lib/navigation";
import { getProductById } from "@/lib/products";
import { seoConfig } from "@/config/seo-config";
import { addToCart } from "@/lib/cart";

// Product Detail Component
export default function ProductDetailPage() {
  const params = useParams();
  const { navigateTo, goBack } = useNavigation();
  const productId = params?.id as string;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const product = productId ? getProductById(productId) : undefined;

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="font-thunder text-4xl font-extralight uppercase tracking-tight text-night sm:text-5xl md:text-6xl">
            PRODUCT NOT FOUND
          </h1>
          <button
            onClick={() => navigateTo(ROUTES.DRIP_ROOM)}
            className="mt-6 font-montserrat text-sm font-bold uppercase tracking-wide text-flame transition-opacity hover:opacity-80 sm:text-base"
          >
            BACK TO DRIP ROOM →
          </button>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!product) return;

    addToCart(product, selectedSize, quantity);
    navigateTo(ROUTES.LOCKER);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Generate product schema using seoConfig
  const productSchema = seoConfig.createProductSchema({
    name: product.pName,
    description: product.pDescription,
    slug: product.id,
    price: product.pPrice,
    currency: "INR",
    imageUrl: product.image,
    brand: seoConfig.brand.siteName,
    sku: product.id,
    availability: "InStock",
    url: seoConfig.getCanonicalUrl(buildDripRoomRoute(product.id)),
  });

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="px-4 pt-16 sm:px-6 sm:pt-20 md:px-8 md:pt-24 lg:px-16">
          <button
            onClick={goBack}
            className="font-montserrat text-xs font-normal uppercase tracking-wide text-night/60 transition-opacity hover:opacity-80 sm:text-sm"
          >
            ← BACK
          </button>
        </div>

        {/* Product Section */}
        <section className="grid grid-cols-1 gap-6 px-4 py-4 sm:px-6 sm:gap-8 sm:py-6 md:grid-cols-2 md:px-8 md:py-8 lg:px-16 lg:py-12">
          {/* Image Column */}
          <div className="relative h-full w-full overflow-hidden bg-iron">
            <Image
              src={product.image}
              alt={product.pName}
              fill
              className="object-cover object-top"
              quality={100}
              priority
            />
          </div>

          {/* Product Info Column */}
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {/* Category */}
            <p className="font-montserrat text-xs font-normal uppercase tracking-[0.35em] text-night/60 sm:text-sm">
              {product.pCategory}
            </p>

            {/* Product Name */}
            <h1 className="font-thunder text-3xl font-extralight uppercase leading-[0.9] tracking-tight text-night sm:text-4xl md:text-5xl lg:text-6xl">
              {product.pName}
            </h1>

            {/* Price */}
            <p className="font-montserrat text-2xl font-bold uppercase tracking-wide text-flame sm:text-3xl md:text-4xl">
              ₹{product.pPrice.toLocaleString()}
            </p>

            {/* Description */}
            <div className="space-y-2 pt-4">
              <p className="font-montserrat text-xs font-normal uppercase tracking-[0.2em] text-night/70 sm:text-sm md:text-base">
                DESCRIPTION
              </p>
              <p className="font-montserrat text-xs font-normal leading-relaxed tracking-wide text-night/70 sm:text-sm md:text-base">
                {product.pDescription}
              </p>
            </div>

            {/* Fit */}
            <div className="space-y-2 pt-4">
              <p className="font-montserrat text-xs font-normal uppercase tracking-[0.2em] text-night/70 sm:text-sm">
                FIT
              </p>
              <p className="font-montserrat text-xs font-normal uppercase tracking-wide text-night sm:text-sm md:text-base">
                {product.pFit}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3 pt-4">
              <p className="font-montserrat text-xs font-normal uppercase tracking-[0.2em] text-night/70 sm:text-sm">
                SELECT SIZE
              </p>
              <div className="flex flex-wrap gap-3">
                {product.pSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`smooth-hover px-4 py-2 font-montserrat text-xs font-normal uppercase tracking-wide transition-all sm:text-sm ${
                      selectedSize === size
                        ? "border-2 border-flame bg-flame text-white"
                        : "border border-night/30 bg-white text-night hover:border-night"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-3 pt-4">
              <p className="font-montserrat text-xs font-normal uppercase tracking-[0.2em] text-night/70 sm:text-sm">
                QUANTITY
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecrement}
                  className="flex h-10 w-10 items-center justify-center border border-night/30 bg-white font-montserrat text-sm font-normal text-night transition-colors hover:border-night"
                >
                  −
                </button>
                <span className="font-montserrat text-sm font-normal uppercase tracking-wide text-night sm:text-base">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="flex h-10 w-10 items-center justify-center border border-night/30 bg-white font-montserrat text-sm font-normal text-night transition-colors hover:border-night"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button - 96px below quantity */}
            <div className="pt-24">
              <button
                onClick={handleAddToCart}
                className="smooth-hover w-full bg-night px-6 py-4 font-montserrat text-xs font-normal uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-90 active:scale-[0.98] sm:text-sm md:px-8 md:py-5"
              >
                ADD TO LOCKER
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
