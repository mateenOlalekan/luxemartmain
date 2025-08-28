'use client'
import { useState } from 'react';
import { Home, ShoppingBag, LogIn, Search, HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-lg mx-auto">
          {/* 404 illustration */}
          <div className="mb-8 relative">
            <div className="relative z-10 text-center">
              <span className="text-9xl font-bold text-gray-200">404</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingBag className="text-green-500 w-24 h-24" />
              </div>
            </div>
          </div>
          
          {/* Error message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
          <p className="text-gray-500 mb-8">
            We couldn't find the page you're looking for. It might have been moved, deleted, 
            or perhaps never existed. Don't worry though, we're here to help you find your way back!
          </p>
          
          {/* Search box */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for products, categories, etc."
                  className="w-full px-4 py-3 pl-10 rounded-l-lg border-2 border-r-0 border-gray-200 focus:outline-none focus:border-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              </div>
              <button 
                onClick={handleSearchSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-r-lg transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
            <a 
              href="/" 
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <Home className="w-5 h-5" />
              Return to Homepage
            </a>
            <a 
              href="#"
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-green-500 hover:text-green-500 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </a>
          </div>
        </div>
      </main>
      
      {/* Popular links section */}
      <section className="bg-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/categories" className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
              <ShoppingBag className="text-green-500 w-6 h-6 mb-2" />
              <span className="text-gray-700 font-medium">Shop Categories</span>
            </a>
            <a href="/signin" className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
              <LogIn className="text-green-500 w-6 h-6 mb-2" />
              <span className="text-gray-700 font-medium">Sign In</span>
            </a>
            <a href="/help" className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
              <HelpCircle className="text-green-500 w-6 h-6 mb-2" />
              <span className="text-gray-700 font-medium">Help Center</span>
            </a>
            <a href="/deals" className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all flex flex-col items-center justify-center text-center">
              <div className="bg-green-100 p-1 rounded-full mb-2">
                <span className="text-green-500 font-bold text-sm">%</span>
              </div>
              <span className="text-gray-700 font-medium">Today's Deals</span>
            </a>
          </div>
        </div>
      </section>
    
    </div>
  );
}