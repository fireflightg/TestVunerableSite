"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Moon, Sun, Menu, X, ShoppingBag, ShoppingCart } from "lucide-react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-[#780000]" : "bg-[#FFF9F0] text-red-600"
      } transition-colors duration-300`}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-600 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-white rounded-full border-t-transparent"
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-8"
          >
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
                </motion.div>
              )}
            </AnimatePresence>

            <main className="flex flex-col items-center justify-center space-y-8 my-20">
              <h1 className="text-6xl md:text-8xl font-serif text-center">
                BLEEDING
                <br />
                FOREVER
              </h1>
              <p className="text-center max-w-md">
                UNLEASHING STYLE THROUGH INNOVATIVE STREETWEAR DESIGNS. CRAFTED
                FOR THE BOLD, THE REBELLIOUS, AND THE FOREVER YOUNG.
              </p>
              <a
                href="mailto:1bleedingforever@gmail.com"
                className="hover:underline"
              >
                1BLEEDINGFOREVER@GMAIL.COM
              </a>
            </main>

            <section className="my-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="BLEEDINGFRVR Design 1"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="BLEEDINGFRVR Design 2"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="BLEEDINGFRVR Design 3"
                  width={300}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </section>

            <section className="my-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Shop Now
                </h2>
                <p className="text-lg mb-8">
                  Discover our latest collection and express your rebellious
                  spirit.
                </p>
                <motion.a
                  href="/store"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center px-6 py-3 ${
                    isDarkMode ? "bg-white text-black" : "bg-red-600 text-white"
                  } rounded-full text-lg font-semibold shadow-lg`}
                >
                  <ShoppingBag className="mr-2" />
                  Visit Store
                </motion.a>
              </motion.div>
            </section>

            <footer className="text-center mt-20">
              <p className="text-sm">
                © 2023 BLEEDINGFRVR. ALL RIGHTS RESERVED.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
