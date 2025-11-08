"use client";

import Image from "next/image";
import { useNavigation, ROUTES } from "@/lib/navigation";
import { seoConfig } from "@/config/seo-config";
import { mockProducts } from "@/lib/products";
import { Product } from "@/types/product";
import { IMAGES } from "@/config/images";

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  const { navigateToDripRoom } = useNavigation();

  const handleClick = () => {
    navigateToDripRoom(product.id);
  };

  return (
    <div
      className="group cursor-pointer overflow-hidden bg-white"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-iron">
        <Image
          src={product.image}
          alt={product.pName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          quality={100}
        />
      </div>

      {/* Product Info */}
      <div className="bg-white p-4 sm:p-6 md:p-8">
        <div className="space-y-2">
          <h3 className="font-montserrat text-sm font-bold uppercase tracking-wide text-night sm:text-base md:text-lg">
            {product.pName}
          </h3>
          <p className="font-montserrat text-xs font-normal uppercase tracking-wide text-night/60 sm:text-sm">
            {product.pCategory}
          </p>
          <p className="font-montserrat text-sm font-bold uppercase tracking-wide text-flame sm:text-base md:text-lg">
            ₹{product.pPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function DripRoomPage() {
  const pageMetadata = seoConfig.getPageMetadata(ROUTES.DRIP_ROOM);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            seoConfig.createCollectionSchema({
              name: "Drip Room - FalseNine",
              description: pageMetadata.description,
              itemCount: mockProducts.length,
              url: seoConfig.getCanonicalUrl(ROUTES.DRIP_ROOM),
            })
          ),
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Header Section - Fixed */}
        <section className="relative h-screen w-full overflow-hidden mt-12 sm:mt-16 md:mt-20">
          <div className="absolute inset-0">
            <Image
              src={IMAGES.BANNER}
              alt="Drip Room"
              fill
              className="object-cover object-center"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Header Content */}
          <div className="relative z-10 flex h-full items-center px-4 md:px-8 lg:px-16">
            <div className="max-w-2xl">
              <h1 className="font-thunder text-7xl font-extralight uppercase leading-[0.85] tracking-tight text-white sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem]">
                DRIP
                <br />
                ROOM
              </h1>
              <p className="mt-6 max-w-lg font-montserrat text-sm font-normal uppercase tracking-wide text-white/90 sm:text-base md:mt-8 md:text-lg">
                {pageMetadata.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-16 lg:py-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
