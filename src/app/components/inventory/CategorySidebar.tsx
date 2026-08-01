import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, Package, Coffee, Cookie, Star } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Category {
  id: string;
  icon: React.ReactNode;
  label: string;
  count: number;
  children?: Category[];
}

interface CategorySidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategorySidebar({ activeCategory, onSelectCategory }: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['sembako', 'minuman']);

  const categories: Category[] = [
    { id: 'all', icon: <Folder size={16} />, label: 'Semua Produk', count: 248 },
    {
      id: 'sembako',
      icon: null,
      label: 'Sembako',
      count: 124,
      children: [
        { id: 'beras', icon: null, label: 'Beras & Gandum', count: 45 },
        { id: 'minyak', icon: null, label: 'Minyak & Lemak', count: 32 },
        { id: 'gula', icon: null, label: 'Gula & Garam', count: 47 }
      ]
    },
    { id: 'minuman', icon: <Coffee size={16} />, label: 'Minuman', count: 68 },
    { id: 'snack', icon: <Cookie size={16} />, label: 'Snack', count: 42 },
    { id: 'lainnya', icon: <Star size={16} />, label: 'Lainnya', count: 14 }
  ];

  const toggleExpand = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const isActive = activeCategory === category.id;
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category.id}>
        <motion.button
          onClick={() => {
            onSelectCategory(category.id);
            if (hasChildren) toggleExpand(category.id);
          }}
          className="w-full flex items-center justify-between p-2.5 rounded-full text-sm transition-all"
          style={{
            paddingLeft: `${level * 16 + 10}px`,
            background: isActive
              ? 'linear-gradient(135deg, #FFE16F, #98E2FD)'
              : 'transparent',
            borderLeft: isActive ? '3px solid #D1F07B' : 'none',
            color: '#1A1A1B'}}
          whileHover={{
            backgroundColor: isActive ? undefined : 'rgba(0, 0, 0, 0.03)'
          }}
        >
          <div className="flex items-center gap-2">
            {hasChildren && (
              <span className="text-[#1A1A1B]">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            )}
            {category.icon && <span>{category.icon}</span>}
            <span className={isActive ? 'font-bold' : ''}>{category.label}</span>
          </div>
          <span className="text-xs text-[#4B5563]">({category.count})</span>
        </motion.button>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {category.children!.map((child) => renderCategory(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className="w-56 rounded-2xl p-4 border-r"
      style={{
        background: 'rgba(0, 0, 0, 0.02)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(0, 0, 0, 0.05)'
      }}
    >
      <h3 className="text-[11px] uppercase font-bold text-[#4B5563] mb-4">
        Kategori
      </h3>
      <div className="space-y-1">
        {categories.map((category) => renderCategory(category))}
      </div>
    </div>
  );
}
