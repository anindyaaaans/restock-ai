import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Aman', value: 70, color: '#A8DDA8' },
  { name: 'Perlu Restok', value: 18, color: '#FFE16F' },
  { name: 'Hampir Habis', value: 9, color: '#FF9B9B' },
  { name: 'Overstock', value: 3, color: '#98E2FD' }
];

export default function StockStatusChart() {
  return (
    <div
      className="rounded-2xl p-7 border"
      style={{
        background: 'rgba(0, 0, 0, 0.03)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Header */}
      <h3 className="text-sm font-bold text-[#0f172a] uppercase mb-6">
        Status Stok Produk
      </h3>

      {/* Chart */}
      <div className="relative flex flex-col items-center">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-xl font-bold text-[#0f172a]">1.248</p>
          <p className="text-[11px] text-[#475569]">Total SKU</p>
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
            <span className="text-xs text-[#475569]">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
