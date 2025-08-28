'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingBag,
  Smartphone,
  Sparkles,
  Home,
  Tv,
  Shirt,
  ShoppingCart,
  Monitor,
  Baby,
  Gamepad,
  Music,
  MoreHorizontal
} from 'lucide-react'

const categories = [
  { icon: ShoppingBag, name: "Appliances", id: "appliances", path: "/category/appliances" },
  { icon: Smartphone, name: "Phones & Tablets", id: "phones-tablets", path: "/category/phones-tablets" },
  { icon: Sparkles, name: "Health & Beauty", id: "health-beauty", path: "/category/health-beauty" },
  { icon: Home, name: "Home & Office", id: "home-office", path: "/category/home-office" },
  { icon: Tv, name: "Electronics", id: "electronics", path: "/category/electronics" },
  { icon: Shirt, name: "Fashion", id: "fashion", path: "/category/fashion" },
  { icon: ShoppingCart, name: "Supermarket", id: "supermarket", path: "/category/supermarket" },
  { icon: Monitor, name: "Computing", id: "computing", path: "/category/computing" },
  { icon: Baby, name: "Baby Products", id: "baby", path: "/category/baby-products" },
  { icon: Gamepad, name: "Gaming", id: "gaming", path: "/category/gaming" },
  { icon: Music, name: "Musical Instruments", id: "music", path: "/category/musical-instruments" },
  { icon: MoreHorizontal, name: "Other categories", id: "other", path: "/category/other-categories" }
]

const CategorySidebar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(prev => prev === categoryId ? null : categoryId)
  }

  return (
    <div className="w-full lg:w-3/12 hidden lg:block h-full">
      <div className="bg-white p-5 border border-gray-200 rounded-2xl shadow-md h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
        <nav className="flex-1 overflow-y-auto">
          {categories.map(({ icon: Icon, name, id, path }) => {
            const isActive = activeCategory === id

            return (
              <Link
                key={id}
                href={path}
                onClick={() => handleCategoryClick(id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-1
                  ${isActive ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100 text-gray-800'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-green-600' : 'text-gray-500'} />
                <span className={`text-sm font-medium ${isActive ? 'text-green-700' : ''}`}>
                  {name}
                </span>
              </Link>
            )
          })}
        </nav>
        
        {/* Special Offer Banner */}
        <div className="mt-auto bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 text-white">
          <h3 className="font-bold text-sm mb-1">Special Offer!</h3>
          <p className="text-xs">Get 15% off on your first order</p>
        </div>
      </div>
    </div>
  )
}

export default CategorySidebar
