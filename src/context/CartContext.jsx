import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. استرجاع السلة من localStorage مع معالجة حقل selected والأسعار
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((item) => ({
        ...item,
        selected: item.selected !== undefined ? item.selected : true,
      }));
    } catch (e) {
      return [];
    }
  });

  // حالة رسالة التنبيه (Toast)
  const [toastMessage, setToastMessage] = useState(null);

  // 2. دالة مساعدة لتنظيف السعر واستخراج الرقم فقط
  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      const cleaned = price.replace(/[^0-9.]/g, "");
      return parseFloat(cleaned) || 0;
    }
    return 0;
  };

  // 3. دالة إظهار التنبيه المؤقت (تختفي بعد 3 ثوانٍ)
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 4. حفظ التغييرات في localStorage عند تعديل السلة
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 5. إضافة منتج للسلة مع حساب الكمية وإظهار الرسالة المناسبة
  const addToCart = (product) => {
    const cleanPrice = parsePrice(product.price);
    const productName = product.name || product.title || "Product";

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedCount = existingItem.quantity + 1;
        showToast(
          `Quantity updated for "${productName}". Current quantity in cart: ${updatedCount}`,
        );
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: updatedCount, price: cleanPrice }
            : item,
        );
      } else {
        showToast(`"${productName}" added to cart successfully!`);
        return [
          ...prevItems,
          {
            ...product,
            price: cleanPrice,
            quantity: 1,
            selected: true,
          },
        ];
      }
    });
  };

  // 6. تبديل حالة تحديد المنتج للشراء (Checkbox)
  const toggleSelectItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  // 7. حذف منتج من السلة
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 8. تحديث كمية منتج
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  // 9. تفريغ السلة بعد إتمام الشراء
  const clearCart = () => setCartItems([]);

  // 10. حساب إجمالي المنتجات المحددة فقط (Selected)
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (!item.selected) return total;
      const priceNum = parsePrice(item.price);
      return total + priceNum * item.quantity;
    }, 0);
  };

  // المنتجات المحددة فقط للشراء
  const selectedItems = cartItems.filter((item) => item.selected);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        toggleSelectItem,
        parsePrice,
      }}
    >
      {children}

      {/* نافذة التنبيهات (Toast Notification) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1D8B96] text-white px-5 py-3 rounded-2xl shadow-2xl transition-all duration-300 animate-bounce text-sm font-semibold flex items-center gap-2 dir-rtl">
          <span className="text-lg">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
