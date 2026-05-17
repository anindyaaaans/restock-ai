import { motion } from 'motion/react';
import { Edit2, Trash2, MoreVertical } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    sku: string;
    stock: number;
    status: 'safe' | 'warning' | 'critical';
    expiryDate?: string;
    image?: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  isSelected,
  onSelect,
  onEdit,
  onDelete
}: ProductCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return '#00FF7F';
      case 'warning':
        return '#FFD700';
      case 'critical':
        return '#FF00FF';
      default:
        return '#E8E8E8';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'safe':
        return 'Aman';
      case 'warning':
        return 'Peringatan';
      case 'critical':
        return 'Habis';
      default:
        return 'Unknown';
    }
  };

  const isNearExpiry = product.expiryDate && new Date(product.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      onClick={() => onSelect(product.id)}
      whileHover={{ y: -8 }}
      className="rounded-2xl p-3 border transition-all cursor-pointer flex flex-col"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(10px)',
        borderColor: isSelected ? '#00FF7F' : 'rgba(255, 255, 255, 0.15)',
        aspectRatio: '1 / 1.3',
        boxShadow: isSelected ? '0 8px 32px rgba(0, 255, 127, 0.3)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.6)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 255, 255, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Product Image */}
      <div
        className="w-full h-28 rounded-xl mb-2 overflow-hidden"
        style={{ background: '#1a1a1a' }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">📦</div>
        )}
      </div>

      {/* Product Name */}
      <h4 className="text-xs font-bold text-white line-clamp-2 mb-1">
        {product.name}
      </h4>

      {/* SKU */}
      <p className="text-[10px] text-[#E8E8E8] mb-2">{product.sku}</p>

      {/* Stock Badge */}
      <div
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg mb-2"
        style={{
          backgroundColor: `${getStatusColor(product.status)}1A`
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: getStatusColor(product.status) }}
        />
        <span
          className="text-[11px] font-bold"
          style={{ color: getStatusColor(product.status) }}
        >
          {product.stock} pcs
        </span>
      </div>

      {/* Expiry Date */}
      {product.expiryDate && (
        <p
          className="text-[9px] mb-2"
          style={{ color: isNearExpiry ? '#FF00FF' : '#E8E8E8' }}
        >
          Exp: {product.expiryDate}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(product.id);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 h-9 rounded-lg border flex items-center justify-center transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.6)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Edit2 size={14} className="text-white" />
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product.id);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 h-9 rounded-lg border flex items-center justify-center transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 0, 255, 0.6)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 0, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Trash2 size={14} className="text-white" />
        </motion.button>

        <motion.button
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderColor: 'rgba(255, 255, 255, 0.15)'
          }}
        >
          <MoreVertical size={14} className="text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}
