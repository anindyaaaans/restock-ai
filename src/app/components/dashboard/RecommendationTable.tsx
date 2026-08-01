import { motion } from 'motion/react';

const recommendations = [
  {
    product: 'Beras Premium 5kg',
    category: 'Sembako',
    stock: 12,
    stockPercent: 20,
    prediction: '3 hari',
    recommendation: '50 pcs'
  },
  {
    product: 'Minyak Goreng 2L',
    category: 'Sembako',
    stock: 5,
    stockPercent: 10,
    prediction: '2 hari',
    recommendation: '30 pcs'
  },
  {
    product: 'Gula Pasir 1kg',
    category: 'Sembako',
    stock: 3,
    stockPercent: 5,
    prediction: '1 hari',
    recommendation: '20 pcs'
  }
];

const getProgressColor = (percent: number) => {
  if (percent <= 10) return 'linear-gradient(90deg, #ef4444, #dc2626)';
  if (percent <= 30) return 'linear-gradient(90deg, #f59e0b, #f97316)';
  return 'linear-gradient(90deg, #10b981, #4f46e5)';
};

export default function RecommendationTable() {
  return (
    <div
      className="rounded-2xl p-7 border"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(255, 255, 255, 0.15)'
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-[#0f172a] uppercase">
          Rekomendasi Restok
        </h3>
        <a href="#" className="text-xs text-[#1A1A1B] font-semibold hover:underline">
          Lihat Semua
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="text-[11px] font-bold text-[#0f172a] uppercase"
              style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            >
              <th className="text-left py-3 px-4 rounded-l-lg">Produk</th>
              <th className="text-left py-3 px-4">Kategori</th>
              <th className="text-left py-3 px-4">Stok</th>
              <th className="text-left py-3 px-4">Prediksi</th>
              <th className="text-left py-3 px-4">Rekomendasi</th>
              <th className="text-left py-3 px-4 rounded-r-lg">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((item, index) => (
              <motion.tr
                key={index}
                className="border-b border-black/5 transition-all"
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <td className="py-4 px-4 text-sm text-[#0f172a]">{item.product}</td>
                <td className="py-4 px-4 text-sm text-[#475569]">{item.category}</td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm text-[#0f172a] mb-1">{item.stock} pcs</p>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.stockPercent}%`,
                          background: getProgressColor(item.stockPercent)
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-[#475569]">{item.prediction}</td>
                <td className="py-4 px-4 text-sm text-[#0f172a] font-bold">
                  {item.recommendation}
                </td>
                <td className="py-4 px-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-[#1A1A1B]"
                    style={{
                      background: '#FFE16F',
                      boxShadow: '0 2px 8px rgba(255, 225, 111, 0.3)'
                    }}
                  >
                    Buat PO
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
