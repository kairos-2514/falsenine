// ============================================================================
// CART UTILITIES
// ============================================================================

import { CartItem, Product } from "@/types/product";

const CART_STORAGE_KEY = "falsenine_cart";

/**
 * Get cart items from localStorage
 */
export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch {
    return [];
  }
};

/**
 * Save cart items to localStorage
 */
export const saveCartItems = (items: CartItem[]): void => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

/**
 * Add item to cart
 */
export const addToCart = (
  product: Product,
  selectedSize: string,
  quantity: number = 1
): void => {
  const cartItems = getCartItems();
  
  // Check if item with same product and size already exists
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === product.id && item.selectedSize === selectedSize
  );

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    const newItem: CartItem = {
      ...product,
      quantity,
      selectedSize,
    };
    cartItems.push(newItem);
  }

  saveCartItems(cartItems);
};

/**
 * Remove item from cart
 */
export const removeFromCart = (itemId: string, selectedSize: string): void => {
  const cartItems = getCartItems();
  const filtered = cartItems.filter(
    (item) => !(item.id === itemId && item.selectedSize === selectedSize)
  );
  saveCartItems(filtered);
};

/**
 * Update item quantity in cart
 */
export const updateCartItemQuantity = (
  itemId: string,
  selectedSize: string,
  quantity: number
): void => {
  if (quantity < 1) {
    removeFromCart(itemId, selectedSize);
    return;
  }

  const cartItems = getCartItems();
  const updated = cartItems.map((item) =>
    item.id === itemId && item.selectedSize === selectedSize
      ? { ...item, quantity }
      : item
  );
  saveCartItems(updated);
};

/**
 * Clear entire cart
 */
export const clearCart = (): void => {
  saveCartItems([]);
};

/**
 * Get cart total
 */
export const getCartTotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce(
    (total, item) => total + item.pPrice * item.quantity,
    0
  );
};

