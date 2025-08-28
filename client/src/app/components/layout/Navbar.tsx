'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { 
  Truck, X, ShoppingBag, Search, User, 
  Package, Heart, Info, ShoppingCart, Menu, ChevronDown 
} from 'lucide-react';

interface Category {
  name: string;
  subcategories: string[];
}

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [cartItems] = useState<number>(0);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [announcementBar, setAnnouncementBar] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const toggleAnnouncement = useCallback(() => {
    setAnnouncementBar(prev => !prev);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }, 500);
  }, [searchQuery, router]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && isMenuOpen && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const categories: Category[] = [
    {
      name: "Electronics",
      subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories", "Wearables", "Audio"]
    },
    {
      name: "Fashion",
      subcategories: ["Men's Clothing", "Women's Clothing", "Footwear", "Accessories", "Jewelry", "Watches"]
    },
    {
      name: "Home & Living",
      subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting", "Storage"]
    },
    {
      name: "Beauty",
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Bath & Body", "Tools"]
    }
  ];

  const toggleMobileCategory = (categoryName: string) => {
    setOpenMobileCategory(prev => prev === categoryName ? null : categoryName);
  };

  return (
    <div className="w-full">
      {announcementBar && (
        <div className="bg-green-500 text-white py-2.5 relative">
          <div className="max-w-screen-2xl mx-auto text-center text-sm font-medium px-4 flex justify-center items-center">
            <Truck size={16} className="mr-2 animate-pulse" />
            <p>Free express shipping on all orders over $75!</p>
            <span className="ml-2 text-xs border border-white/50 rounded-full px-2 py-0.5">LIMITED TIME</span>
            <button 
              onClick={toggleAnnouncement}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-300"
              aria-label="Close announcement"
            >
              <X size={16} />
            </button>
          </div>
        </div>       
      )}

      <header className={`bg-white ${scrolled ? 'shadow-lg' : 'shadow-sm'} sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 md:py-3">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="font-semibold text-2xl tracking-tight">
                <span className="text-green-600">Luxe</span>
                <span className="text-black">Market</span>
                <ShoppingBag className="inline-block ml-1 text-green-500" size={20} />
              </Link>
            </div>
            
            {/* Search Bar - Hidden on Mobile */}
            <div className="hidden md:block flex-grow max-w-2xl mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <div className={`relative flex items-center w-full overflow-hidden rounded-full border ${isSearchFocused ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-200'} transition-all duration-300`}>
                  <Search size={18} className={`absolute left-4 transition-colors duration-300 ${isSearchFocused ? 'text-green-600' : 'text-gray-400'}`} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products, brands, and more..."
                    className="w-full pl-12 pr-4 py-3 bg-white focus:outline-none transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    aria-label="Search products"
                  />
                  <button 
                    type="submit"
                    className={`absolute right-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${searchQuery.length > 0 ? 'opacity-100' : 'opacity-0'}`}
                    disabled={isLoading || !searchQuery.trim()}
                    aria-label="Search"
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Right Navigation - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative" ref={userDropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-expanded={isDropdownOpen}
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <User size={22} className="text-gray-600" />
                  <span className="text-sm font-medium">Account</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 rounded-full p-2">
                          <User size={22} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Welcome</p>
                          <p className="text-xs text-gray-500">Sign in to your account</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/login"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block w-full px-4 py-3 text-center font-medium text-white bg-green-600 hover:bg-green-700 transition-colors mx-auto my-2 rounded-md"
                    >
                      Sign In
                    </Link>
                    <div className="text-center text-xs text-gray-500 mb-2">
                      New customer? <Link href="/register" className="text-green-600 hover:underline">Register here</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200" aria-label="About us">
                <Info size={20} className="hover:scale-110 transition-transform duration-200" />
              </Link>

              <Link href="/cart" className="flex items-center text-gray-700 hover:text-green-600 group relative transition-colors duration-200" aria-label="Shopping cart">
                <div className="relative">
                  <ShoppingCart size={20} className="hover:scale-110 transition-transform duration-200" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-200">
                      {cartItems}
                    </span>
                  )}
                </div>
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 focus:outline-none"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div 
              ref={mobileMenuRef}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="font-bold text-xl">
                  <span className="text-green-600">Luxe</span>
                  <span className="text-black">Market</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="px-4 py-3 border-b border-gray-100">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search products"
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 top-0 mt-2.5 mr-3 text-gray-400 hover:text-green-600 transition-colors duration-200"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                </form>
              </div>
              
              {/* User Section in Mobile Menu */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-full p-2">
                      <User size={22} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Welcome</p>
                      <p className="text-xs text-gray-500">Sign in to your account</p>
                    </div>
                  </div>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-center font-medium text-white bg-green-600 hover:bg-green-700 transition-colors rounded-md mt-2"
                  >
                    Sign In
                  </Link>
                  <div className="text-center text-xs text-gray-500 mt-1">
                    New customer? <Link href="/register" onClick={() => setIsMenuOpen(false)} className="text-green-600 hover:underline">Register here</Link>
                  </div>
                </div>
              </div>
              
              <nav className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                  {/* Quick Links */}
                  <li>
                    <Link 
                      href="/account" 
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-3 text-gray-500" />
                      <span>My Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/orders" 
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Package size={18} className="mr-3 text-gray-500" />
                      <span>Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/wishlist" 
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart size={18} className="mr-3 text-gray-500" />
                      <span>Wishlist</span>
                    </Link>
                  </li>
                  
                  {/* Categories */}
                  <li className="pt-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Categories
                    </div>
                  </li>
                  {categories.map((category) => (
                    <li key={category.name} className="py-1">
                      <button
                        className="w-full px-4 py-3 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleMobileCategory(category.name)}
                        aria-expanded={openMobileCategory === category.name}
                      >
                        <span className="font-medium text-gray-800">{category.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={`text-gray-600 transition-transform duration-200 ${openMobileCategory === category.name ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      {openMobileCategory === category.name && (
                        <ul className="bg-gray-50 pl-8 py-1">
                          {category.subcategories.map((subcat) => (
                            <li key={subcat}>
                              <Link 
                                href={`/category/${category.name.toLowerCase()}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block py-2.5 text-sm text-gray-700 hover:text-green-600 transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subcat}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link 
                              href={`/category/${category.name.toLowerCase()}`}
                              className="block py-2.5 text-sm text-green-600 font-medium hover:text-green-600 transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              View All →
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                  <li>
                    <Link 
                      href="/sale" 
                      className="block px-4 py-3 text-green-600 font-medium hover:text-green-700 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sale
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/new-arrivals" 
                      className="block px-4 py-3 text-green-600 font-medium hover:text-green-600 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      New Arrivals
                    </Link>
                  </li>
                </ul>
              </nav>
              
              <div className="border-t border-gray-100">
                <Link 
                  href="/cart" 
                  className="flex items-center px-4 py-3.5 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative">
                    <ShoppingCart size={20} className="mr-3" />
                    {cartItems > 0 && (
                      <span className="absolute -top-2 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}