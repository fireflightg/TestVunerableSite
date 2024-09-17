"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Moon, Sun, Menu, X, ShoppingCart, Plus, Minus } from "lucide-react";

// Product data
const products = [
  {
    id: 1,
    name: "Classic BLEEDINGFRVR Tee",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Our iconic tee featuring the BLEEDINGFRVR logo. Made from 100% organic cotton for ultimate comfort.",
  },
  {
    id: 2,
    name: "Streetwear Hoodie",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Stay warm and stylish with our premium hoodie. Features a bold graphic print on the back.",
  },
  {
    id: 3,
    name: "Urban Cargo Pants",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Versatile cargo pants with multiple pockets. Perfect for the street-savvy fashionista.",
  },
  {
    id: 4,
    name: "Graffiti Snapback",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Adjustable snapback cap featuring our unique graffiti-inspired design.",
  },
  {
    id: 5,
    name: "Rebel Leather Jacket",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Premium leather jacket with a distressed finish. A true statement piece for the bold.",
  },
  {
    id: 6,
    name: "Street Art Backpack",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    description:
      "Durable backpack with a custom street art print. Multiple compartments for all your gear.",
  },
];

export default function StorePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-[#780000]" : "bg-[#FFF9F0] text-red-600"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <div className="w-24">
            <Image
              src="/bl.png"
              alt="BLEEDINGFRVR Logo"
              width={200}
              height={50}
              className="w-full h-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <a href="#" className="hover:underline">
              HOME
            </a>
            <a href="#" className="hover:underline">
              STORE
            </a>
            <a href="#" className="hover:underline">
              ABOUT
            </a>
            <button
              onClick={toggleDarkMode}
              className="focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleCart}
              className="focus:outline-none relative"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-red-600 text-white p-4 z-50"
            >
              <a href="#" className="block py-2">
                HOME
              </a>
              <a href="#" className="block py-2">
                STORE
              </a>
              <a href="#" className="block py-2">
                ABOUT
              </a>
              <div className="flex items-center justify-between py-2">
                <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                <button
                  onClick={toggleDarkMode}
                  className="focus:outline-none"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              <button
                onClick={toggleCart}
                className="flex items-center justify-between w-full py-2"
                aria-label="Open cart"
              >
                <span>Cart</span>
                <ShoppingCart size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          <h1 className="text-4xl md:text-6xl font-serif text-center mb-12">
            BUY NOW
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className={`border ${
                  isDarkMode ? "border-white" : "border-red-600"
                } rounded-lg overflow-hidden cursor-pointer text-center`}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover"
                  onClick={() => setSelectedProduct(product)}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p
                    className={`mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-red-600"
                } rounded-lg p-8 max-w-md w-full`}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <h2 className="text-2xl font-bold mb-2 text-center">
                  {selectedProduct.name}
                </h2>
                <p
                  className={`mb-4 text-center ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  ${selectedProduct.price.toFixed(2)}
                </p>
                <p
                  className={`mb-4 text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {selectedProduct.description}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300 flex items-center"
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`${
                      isDarkMode
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={toggleCart}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-red-600"
                } fixed right-0 top-0 h-full w-full max-w-md p-8 overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mb-4"
                      >
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded mr-4"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p>${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-8">
                      <p className="text-xl font-bold">
                        Total: ${totalPrice.toFixed(2)}
                      </p>
                    </div>
                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300 w-full">
                      Checkout
                    </button>
                  </>
                )}
                <button
                  onClick={toggleCart}
                  className="absolute top-4 right-4 focus:outline-none"
                  aria-label="Close cart"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-center mt-20">
          <p className="text-sm">© 2023 BLEEDINGFRVR. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </div>
  );
}
