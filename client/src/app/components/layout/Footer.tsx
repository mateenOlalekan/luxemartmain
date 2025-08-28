'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingBag, ArrowUp, Send, AlertCircle, Award, 
  Phone, Clock, MapPin, ChevronRight 
} from 'lucide-react';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, 
  FaLinkedin,  FaApple, FaGooglePlay, 
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaRegCreditCard 
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function EnhancedFooter() {
  const [email, setEmail] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('English');
  const [currency, setCurrency] = useState<string>('USD');
  
  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Data for dynamic rendering
  const benefits = [
    { 
      icon: '🚚', 
      title: 'Free Delivery', 
      description: 'Free shipping over $100' 
    },
    { 
      icon: '🛡️', 
      title: 'Money Back Guarantee', 
      description: 'Quality checked by our team' 
    },
    { 
      icon: '💬', 
      title: 'Customer Support', 
      description: 'Friendly 24/7 customer support' 
    },
    { 
      icon: '🎁', 
      title: 'Special Offers', 
      description: 'New deals every week' 
    }
  ];

  const shopCategories = [
    'Televisions', 'Fridges', 'Washing Machines',
    'Fans', 'Air Conditioners', 'Laptops',
    'Smartphones', 'Audio Systems'
  ];

  const helpLinks = [
    'Customer Service', 'Find a Store', 
    'Legal & Privacy', 'Contact', 'Gift Card',
    'FAQ', 'Shipping Info', 'Returns Policy'
  ];

  const accountLinks = [
    'My Profile', 'My Order History', 
    'My Wish List', 'Order Tracking',
    'Shopping Cart', 'Addresses',
    'Compare Products', 'Payment Methods'
  ];

  const socialMedia = [
    { Icon: FaFacebook, label: 'Facebook' },
    { Icon: FaTwitter, label: 'Twitter' },
    { Icon: FaInstagram, label: 'Instagram' },
    { Icon: FaYoutube, label: 'YouTube' },
    { Icon: FaLinkedin, label: 'LinkedIn' },
  ];

  const paymentMethods = [
    { Icon: FaCcVisa, label: 'Visa' },
    { Icon: FaCcMastercard, label: 'Mastercard' },
    { Icon: FaCcPaypal, label: 'PayPal' },
    { Icon: FaCcAmex, label: 'American Express' },
    { Icon: FaRegCreditCard, label: 'Credit Card' }
  ];

  const footerLinks = [
    'Privacy Policy', 'Terms & Conditions', 
    'Cookie Policy', 'Accessibility', 'Sitemap'
  ];

  return (
    <footer className="bg-white text-gray-800 w-full">
      {/* Benefits Section - Optimized with grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-center p-4 gap-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-green-500"
            >
              <span className="text-3xl">{benefit.icon}</span>
              <div>
                <h5 className="font-bold text-gray-900 text-base sm:text-lg">{benefit.title}</h5>
                <p className="text-gray-600 text-xs sm:text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Footer - Improved spacing and structure */}
      <div className="bg-gray-900 w-full text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand & Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-2xl sm:text-3xl">
                  <span className="text-green-400">Luxe</span>
                  <span className="text-white">Mart</span>
                </h3>
                <ShoppingBag className="text-green-400" size={24} />
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Your premium online shopping destination offering quality products, 
                unbeatable deals, and exceptional customer service.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">Mon-Fri: 9AM-6PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdEmail className="text-green-400 flex-shrink-0" size={16} />
                  <span className="text-gray-200">support@luxemart.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">123 Commerce St, Business City</span>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg uppercase tracking-wide pb-2 border-b border-gray-700">
                Shop
              </h4>
              <ul className="space-y-2">
                {shopCategories.map((item) => (
                  <li key={item}>
                    <a href="#" className="flex items-center group text-gray-300 hover:text-green-400 text-sm ">
                      <ChevronRight size={14} className="mr-1 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-semibold text-lg uppercase tracking-wide pb-2 border-b border-gray-700">
                Help
              </h4>
              <ul className="space-y-2">
                {helpLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="flex items-center group text-gray-300 hover:text-green-400 text-sm ">
                      <ChevronRight size={14} className="mr-1 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-semibold text-lg uppercase tracking-wide pb-2 border-b border-gray-700">
                Account
              </h4>
              <ul className="space-y-2">
                {accountLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="flex items-center group text-gray-300 hover:text-green-400 text-sm ">
                      <ChevronRight size={14} className="mr-1 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h5 className="font-semibold text-lg">Download Our App</h5>
                <div className="flex flex-col gap-2">
                  <a href="#" className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 ">
                    <FaApple size={18} />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-300">Download on the</span>
                      <span className="font-medium">App Store</span>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 ">
                    <FaGooglePlay size={16} />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-300">Get it on</span>
                      <span className="font-medium">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="font-semibold text-lg mb-3">Follow Us</h5>
                <div className="flex flex-wrap gap-2">
                  {socialMedia.map(({ Icon, label }, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      aria-label={label}
                      className="bg-gray-700 p-2 rounded-full hover:bg-green-500  duration-200"
                      title={label}
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section - Improved layout */}
        <div className="border-t border-gray-700 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
              <div className="max-w-md">
                <h4 className="font-semibold text-xl mb-2">Stay Updated</h4>
                <p className="text-gray-300 text-sm">
                  Subscribe for exclusive offers and trends. Join 25,000+ subscribers who get our best deals.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="w-full lg:w-auto lg:flex-1 max-w-xl">
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <input 
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 min-w-0 p-3 text-gray-800 bg-white border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <button 
                      type="submit"
                      className="bg-green-500 text-white py-3 px-4 sm:px-6 rounded-r-lg hover:bg-green-600  duration-200 font-medium flex items-center text-sm"
                    >
                      <Send className="mr-2" size={16} />
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 flex items-start">
                    <AlertCircle className="mr-1 mt-0.5 flex-shrink-0" size={14} />
                    By subscribing, you agree to our Privacy Policy.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Language/Currency Selectors */}
        <div className="border-t border-gray-700 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-700 text-white rounded py-2 px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 appearance-none"
                  >
                    {['English', 'Spanish', 'French', 'German', 'Japanese'].map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <ChevronRight size={14} className="absolute right-2 top-2.5 rotate-90 pointer-events-none text-gray-400" />
                </div>
                
                <div className="relative">
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-gray-700 text-white rounded py-2 px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-green-400 appearance-none"
                  >
                    {['USD', 'EUR', 'GBP', 'CAD', 'AUD'].map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                  <ChevronRight size={14} className="absolute right-2 top-2.5 rotate-90 pointer-events-none text-gray-400" />
                </div>
              </div>
              
              <div className="flex items-center">
                <Award className="mr-2 text-green-400" size={18} />
                <span className="text-gray-300 text-sm">Secure Online Shopping</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer - Optimized layout */}
        <div className="border-t border-gray-700 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-300 order-2 md:order-1">
                &copy; {new Date().getFullYear()} LuxeMart. All rights reserved
              </p>
              
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-300 order-1 md:order-2">
                {footerLinks.map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="hover:text-green-400  whitespace-nowrap"
                  >
                    {item}
                  </a>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 order-3">
                {paymentMethods.map(({ Icon, label }, index) => (
                  <Icon 
                    key={index} 
                    size={20} 
                    className="text-gray-300 hover:text-white " 
                    title={label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 bg-green-500 text-white p-2.5 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </footer>
  );
}