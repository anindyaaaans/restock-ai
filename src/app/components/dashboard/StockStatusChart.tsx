import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Aman', value: 70, color: '#00FF7F' },
  { name: 'Perlu Restok', value: 18, color: '#FFD700' },
  { name: 'Hampir Habis', value: 9, color: '#FF6B6B' },
  { name: 'Overstock', value: 3, color: '#FF00FF' }
];

export default function StockStatusChart() {
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
      <h3 className="text-sm font-bold text-white uppercase mb-6">
        Status Stok Produk
      </h3>

      {/* Chart */}
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-16">
          <p className="text-xl font-bold text-white">1.248</p>
          <p className="text-[11px] text-[#E8E8E8]">Total SKU</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: item.color }}
            />
            <span className="text-xs text-[#E8E8E8]">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
