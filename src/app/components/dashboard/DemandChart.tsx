import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { date: '5-8 May', permintaan: 120, stok: 150 },
  { date: '10 May', permintaan: 150, stok: 140 },
  { date: '22 May', permintaan: 180, stok: 120 },
  { date: '30 May', permintaan: 210, stok: 100 }
];

export default function DemandChart() {
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-[#1A1A1B] uppercase">
          Prediksi Permintaan vs Stok
        </h3>
        <div
          className="px-3 py-1 rounded-full text-[10px] text-[#1A1A1B] font-bold"
          style={{ background: '#FFE16F' }}
        >
           AI-Powered
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPermintaan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#98E2FD" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1A1A1B" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorStok" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F5C897" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFD700" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="linePermintaan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#98E2FD" />
              <stop offset="100%" stopColor="#1A1A1B" />
            </linearGradient>
            <linearGradient id="lineStok" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F5C897" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.03)" />
          <XAxis dataKey="date" stroke="#475569" style={{ fontSize: '12px' }} />
          <YAxis stroke="#475569" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              color: '#1A1A1B'}}
          />
          <Area
            type="monotone"
            dataKey="permintaan"
            stroke="url(#linePermintaan)"
            strokeWidth={3}
            fill="url(#colorPermintaan)"
          />
          <Area
            type="monotone"
            dataKey="stok"
            stroke="url(#lineStok)"
            strokeWidth={3}
            fill="url(#colorStok)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
