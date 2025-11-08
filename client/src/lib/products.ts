// ============================================================================
// MOCK PRODUCT DATA
// ============================================================================

import { Product } from "@/types/product";
import { IMAGES } from "@/config/images";

export const mockProducts: Product[] = [
  {
    id: "frontline",
    pName: "Frontline",
    pPrice: 10,
    pDescription:
      "Black jersey with gold & black paneling, styled with a classic fit, finished with curved gold lines tracing the sides. Embroidered False Nine crest on the chest. Built for comfort, made for the streets.",
    pSizes: ["S", "M", "L", "XL"],
    pCategory: "Jerseys",
    pFit: "Regular",
    image: IMAGES.BANNER,
  },
  {
    id: "reign",
    pName: "Reign",
    pPrice: 10,
    pDescription:
      "A bold statement in purple and black, accented with gold detailing that defines confidence and edge. Designed with a relaxed athletic cut and the iconic False Nine fox on the sleeve. Made for those who rule both the pitch and the pavement.",
    pSizes: ["S", "M", "L", "XL"],
    pCategory: "Jerseys",
    pFit: "Oversized",
    image: IMAGES.RIGHT_SIDE,
  },
  {
    id: "crossfade",
    pName: "Crossfade",
    pPrice: 10,
    pDescription:
      "Minimal yet striking — beige base with deep blue geometric lines that fade into simplicity. The False Nine insignia sits proudly on the chest, representing the blend of calm and chaos. Built for the modern minimalist with a street-core heart.",
    pSizes: ["S", "M", "L", "XL"],
    pCategory: "Jerseys",
    pFit: "Relaxed",
    image: IMAGES.LEFT_SIDE,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter((product) => product.pCategory === category);
};
