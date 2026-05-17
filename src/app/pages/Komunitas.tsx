import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { ChevronRight, Pin } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Group {
  id: string;
  icon: string;
  iconBg: string;
  name: string;
  members: string;
  activity: string;
  activityColor: string;
  tags: { label: string; color: string }[];
  previewAvatar: string;
  previewName: string;
  previewText: string;
  previewTime: string;
  joined: boolean;
}

interface Post {
  id: string;
  avatarBg: string;
  avatarText: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  group: string;
  time: string;
  pinned?: boolean;
  title: string;
  preview?: string;
  likes: string;
  comments: string;
  saves?: string;
}

interface Contributor {
  rank: string;
  rankEmoji?: string;
  avatarBg: string;
  initials: string;
  name: string;
  city: string;
  contributions: string;
}

interface Event {
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const groups: Group[] = [
  {
    id: 'g1',
    icon: '🌾',
    iconBg: 'rgba(0,255,127,0.12)',
    name: 'Sembako & Grosir Indonesia',
    members: '4.821',
    activity: '🟢 Aktif',
    activityColor: '#00FF7F',
    tags: [
      { label: 'Sembako', color: '#00FFFF' },
      { label: 'Grosir', color: '#FFD700' },
      { label: 'Harga Pasar', color: '#C084FC' },
    ],
    previewAvatar: 'BK',
    previewName: 'Budi K',
    previewText: 'Ada yang tau harga beras premium GudangAda bulan ini? Naik ga ya...',
    previewTime: '15 menit lalu',
    joined: true,
  },
  {
    id: 'g2',
    icon: '🍜',
    iconBg: 'rgba(255,215,0,0.12)',
    name: 'F&B Owners Indonesia',
    members: '3.244',
    activity: '🟢 Aktif',
    activityColor: '#00FF7F',
    tags: [
      { label: 'F&B', color: '#FFD700' },
      { label: 'Kuliner', color: '#FF8A8A' },
      { label: 'Tips Menu', color: '#00FFFF' },
    ],
    previewAvatar: 'SR',
    previewName: 'Siti R',
    previewText: 'Supplier frozen food yang reliable di Jakarta ada yang rekomen?',
    previewTime: '42 menit lalu',
    joined: true,
  },
  {
    id: 'g3',
    icon: '📊',
    iconBg: 'rgba(0,255,255,0.1)',
    name: 'Tips Manajemen Stok',
    members: '6.182',
    activity: '🟢 Sangat Aktif',
    activityColor: '#00FF7F',
    tags: [
      { label: 'Manajemen', color: '#00FFFF' },
      { label: 'Stok', color: '#00FF7F' },
      { label: 'Tips', color: '#FFD700' },
    ],
    previewAvatar: 'RA',
    previewName: 'Rudi A',
    previewText: 'Cara saya menghemat 30% biaya inventori dengan RestockAI...',
    previewTime: '1 jam lalu',
    joined: false,
  },
  {
    id: 'g4',
    icon: '👗',
    iconBg: 'rgba(255,0,255,0.1)',
    name: 'Fashion UMKM Nusantara',
    members: '2.108',
    activity: '🟡 Cukup Aktif',
    activityColor: '#FFD700',
    tags: [
      { label: 'Fashion', color: '#FF00FF' },
      { label: 'Tekstil', color: '#C084FC' },
      { label: 'Trend', color: '#FFD700' },
    ],
    previewAvatar: 'ML',
    previewName: 'Maya L',
    previewText: 'Update tren fashion lokal Q2 2024...',
    previewTime: '3 jam lalu',
    joined: false,
  },
];

const posts: Post[] = [
  {
    id: 'p1',
    avatarBg: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
    avatarText: 'RD',
    name: 'Rudi Dharma',
    badge: '⭐ Top Kontributor',
    badgeColor: '#FFD700',
    badgeBg: 'rgba(255,215,0,0.15)',
    group: 'Tips Manajemen Stok',
    time: '3 jam lalu',
    pinned: true,
    title: 'Cara saya menghemat Rp 3.5M/bulan dengan manajemen stok berbasis data — Thread',
    preview: 'Sebelum pakai sistem prediksi, saya sering overbuy dan rugi karena barang kadaluarsa. Berikut 5 langkah yang saya terapkan...',
    likes: '284',
    comments: '67',
    saves: '124',
  },
  {
    id: 'p2',
    avatarBg: 'linear-gradient(135deg, #00804A, #00FF7F)',
    avatarText: 'SN',
    name: 'Siti Nurhaliza',
    badge: 'Anggota Baru',
    badgeColor: '#C8C8C8',
    badgeBg: 'rgba(200,200,200,0.12)',
    group: 'Sembako & Grosir',
    time: '1 jam lalu',
    title: 'Harga beras GudangAda vs Mitra Toko — mana lebih worth? Sharing pengalaman dong',
    preview: 'Toko saya di Jakarta Timur, butuh 200kg beras/minggu. Ada yang sudah compare keduanya?',
    likes: '45',
    comments: '23',
  },
  {
    id: 'p3',
    avatarBg: 'linear-gradient(135deg, #007A8A, #00FFFF)',
    avatarText: 'AH',
    name: 'Anton Hakim',
    badge: '⭐ Top Kontributor',
    badgeColor: '#FFD700',
    badgeBg: 'rgba(255,215,0,0.15)',
    group: 'Tips Manajemen',
    time: '5 jam lalu',
    title: 'Prediksi AI RestockAI meleset atau akurat? Diskusi jujur setelah 3 bulan pakai',
    preview: 'Sudah 3 bulan pakai fitur prediksi stok. Overall akurasi ~87%, tapi ada beberapa kategori yang masih miss...',
    likes: '198',
    comments: '89',
    saves: '76',
  },
  {
    id: 'p4',
    avatarBg: 'linear-gradient(135deg, #8A004A, #FF00FF)',
    avatarText: 'DL',
    name: 'Dewi Lestari',
    group: 'F&B Owners',
    time: 'Kemarin',
    title: 'Rekomendasi supplier frozen food Jakarta yang reliable & harga stabil?',
    preview: 'Supplier lama saya tiba-tiba naikkan harga 15%. Perlu cari alternatif yang konsisten.',
    likes: '56',
    comments: '31',
  },
];

const contributors: Contributor[] = [
  { rank: '1', rankEmoji: '🥇', avatarBg: 'linear-gradient(135deg, #4A1063, #8B4BBE)', initials: 'RD', name: 'Rudi Dharma', city: 'Jakarta', contributions: '284' },
  { rank: '2', rankEmoji: '🥈', avatarBg: 'linear-gradient(135deg, #00804A, #00FF7F)', initials: 'AH', name: 'Anton Hakim', city: 'Bandung', contributions: '198' },
  { rank: '3', rankEmoji: '🥉', avatarBg: 'linear-gradient(135deg, #007A8A, #00FFFF)', initials: 'BK', name: 'Budi Kusuma', city: 'Surabaya', contributions: '167' },
  { rank: '4', rankEmoji: undefined, avatarBg: 'linear-gradient(135deg, #5A5A00, #AAAA00)', initials: 'SR', name: 'Siti R.', city: 'Medan', contributions: '143' },
  { rank: '5', rankEmoji: undefined, avatarBg: 'linear-gradient(135deg, #7A004A, #CC0077)', initials: 'ML', name: 'Maya L.', city: 'Yogyakarta', contributions: '98' },
];

const events: Event[] = [
  { month: 'JUN', day: '5', title: 'Webinar: Manajemen Stok UMKM di Era Digital', time: '19.00 WIB', location: 'Via Zoom' },
  { month: 'JUN', day: '12', title: 'Workshop Offline: Strategi Harga untuk Toko Sembako', time: '09.00 WIB', location: 'Jakarta' },
  { month: 'JUN', day: '20', title: 'Kopdar RestockAI Community — Meet & Greet', time: '15.00 WIB', location: 'Jakarta' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function GroupCard({ group, delay }: { group: Group; delay: number }) {
  const [joined, setJoined] = useState(group.joined);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${joined ? 'rgba(0,255,127,0.3)' : hovered ? 'rgba(139,75,190,0.35)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 12,
        padding: 18,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header */}
      <div className="flex items-center" style={{ gap: 12 }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: 44, height: 44, borderRadius: 10, background: group.iconBg, fontSize: 22 }}
        >
          {group.icon}
        </div>
        <div>
          <p className="font-bold text-white" style={{ fontSize: 14 }}>{group.name}</p>
          <div className="flex items-center" style={{ gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 11, color: '#8A8A8A' }}>{group.members} anggota</span>
            <span style={{ fontSize: 10, color: group.activityColor }}>{group.activity}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap" style={{ gap: 6, marginTop: 10 }}>
        {group.tags.map((tag) => (
          <span
            key={tag.label}
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: tag.color,
              fontSize: 10,
              borderRadius: 20,
              padding: '2px 10px',
            }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Latest post preview */}
      <div
        className="flex items-start"
        style={{
          gap: 8,
          marginTop: 10,
          paddingTop: 10,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 font-bold text-white"
          style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
            fontSize: 9,
          }}
        >
          {group.previewAvatar}
        </div>
        <p
          style={{
            fontSize: 11,
            color: '#8A8A8A',
            flex: 1,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          <span style={{ color: '#C8C8C8', fontWeight: 600 }}>{group.previewName}: </span>
          {group.previewText}
        </p>
        <span style={{ fontSize: 10, color: '#8A8A8A', flexShrink: 0, marginLeft: 4 }}>
          {group.previewTime}
        </span>
      </div>

      {/* Action button */}
      <motion.button
        whileHover={!joined ? { boxShadow: '0 0 16px rgba(74,16,99,0.5)' } : {}}
        whileTap={{ scale: 0.97 }}
        onClick={() => setJoined(!joined)}
        className="w-full font-bold"
        style={{
          marginTop: 12,
          height: 36,
          borderRadius: 8,
          fontSize: 11,
          cursor: joined ? 'default' : 'pointer',
          background: joined ? 'rgba(0,255,127,0.12)' : 'linear-gradient(135deg, #4A1063, #8B4BBE)',
          border: joined ? '1px solid rgba(0,255,127,0.3)' : 'none',
          color: joined ? '#00FF7F' : '#fff',
          transition: 'all 0.2s',
        }}
      >
        {joined ? 'Bergabung ✓' : '+ Bergabung'}
      </motion.button>
    </motion.div>
  );
}

function PostItem({ post, delay }: { post: Post; delay: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.35 }}
      className="border-b"
      style={{
        padding: '18px 20px',
        borderColor: 'rgba(255,255,255,0.06)',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div className="flex items-start" style={{ gap: 12 }}>
        {/* Avatar */}
        <div
          className="flex items-center justify-center font-bold text-white flex-shrink-0"
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: post.avatarBg,
            fontSize: 13,
          }}
        >
          {post.avatarText}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name row */}
          <div className="flex items-center flex-wrap" style={{ gap: 6 }}>
            <span className="font-bold text-white" style={{ fontSize: 13 }}>{post.name}</span>
            {post.badge && (
              <span
                className="font-bold"
                style={{
                  fontSize: 9,
                  background: post.badgeBg,
                  color: post.badgeColor,
                  borderRadius: 20,
                  padding: '2px 8px',
                }}
              >
                {post.badge}
              </span>
            )}
            <span style={{ fontSize: 11, color: '#8A8A8A' }}>· {post.group} · {post.time}</span>
          </div>

          {/* Title */}
          <p className="font-bold text-white" style={{ fontSize: 14, marginTop: 8, lineHeight: 1.4 }}>
            {post.title}
          </p>

          {/* Preview */}
          {post.preview && (
            <p
              style={{
                fontSize: 12,
                color: '#8A8A8A',
                marginTop: 6,
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.preview}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center flex-wrap" style={{ gap: 20, marginTop: 12 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
              style={{
                fontSize: 11,
                color: liked ? '#FF4A8A' : '#8A8A8A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.15s',
              }}
            >
              {liked ? '❤️' : '🤍'} {post.likes} suka
            </button>
            <span style={{ fontSize: 11, color: '#8A8A8A' }}>💬 {post.comments} komentar</span>
            {post.saves && (
              <span style={{ fontSize: 11, color: '#8A8A8A' }}>🔖 {post.saves} simpan</span>
            )}
            <button
              style={{
                fontSize: 11,
                color: '#00FFFF',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 'auto',
              }}
            >
              ↗ Bagikan
            </button>
          </div>
        </div>

        {/* Pin */}
        {post.pinned && (
          <Pin size={14} color="#8A8A8A" style={{ flexShrink: 0, marginTop: 2 }} />
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Komunitas() {
  const navigate = useNavigate();
  const [composeValue, setComposeValue] = useState('');

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #1a0f2e 100%)' }}
    >
      <Sidebar activePage="komunitas" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 40px' }}>

        {/* ── Page Header ── */}
        <div>
          <h1 className="font-bold text-white" style={{ fontSize: 20 }}>Komunitas RestockAI</h1>
          <p style={{ fontSize: 13, color: '#8A8A8A', marginTop: 4 }}>
            Terhubung dengan ribuan pemilik UMKM Indonesia yang sukses
          </p>
        </div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between"
          style={{
            marginTop: 24,
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '16px 24px',
          }}
        >
          {[
            { value: '12.483', label: 'Member Aktif', gradient: true },
            { value: '847', label: 'Diskusi Minggu Ini', color: '#fff' },
            { value: '234', label: 'Tips Dibagikan', color: '#FFD700' },
            { value: '98%', label: 'Pertanyaan Terjawab', color: '#00FF7F' },
          ].map((stat, i) => (
            <div key={i} className="flex" style={{ flex: 1, alignItems: 'stretch' }}>
              {i > 0 && (
                <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', marginRight: 0 }} />
              )}
              <div className="flex flex-col items-center" style={{ flex: 1 }}>
                <span
                  className="font-bold"
                  style={
                    stat.gradient
                      ? {
                          fontSize: 24,
                          background: 'linear-gradient(135deg, #00FF7F, #00FFFF)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : { fontSize: 24, color: stat.color }
                  }
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: 11, color: '#8A8A8A', marginTop: 4 }}>{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Main Layout: Left 70% + Right 30% ── */}
        <div className="flex" style={{ marginTop: 24, gap: 20, alignItems: 'flex-start' }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ flex: '0 0 calc(70% - 10px)', minWidth: 0 }}>

            {/* SECTION A — Grup Komunitas */}
            <div>
              <h2 className="font-bold text-white" style={{ fontSize: 14, marginBottom: 16 }}>
                Grup Komunitas
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {groups.map((g, i) => (
                  <GroupCard key={g.id} group={g} delay={0.05 + i * 0.07} />
                ))}
              </div>
            </div>

            {/* SECTION B — Diskusi Populer */}
            <div style={{ marginTop: 28 }}>
              {/* Header row */}
              <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                <div className="flex items-baseline" style={{ gap: 8 }}>
                  <h2 className="font-bold text-white" style={{ fontSize: 14 }}>Diskusi Populer</h2>
                  <span style={{ fontSize: 11, color: '#8A8A8A' }}>Trending minggu ini</span>
                </div>
                <button
                  style={{ fontSize: 12, color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                >
                  Semua Diskusi →
                </button>
              </div>

              {/* Compose box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex items-center"
                style={{
                  gap: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  marginBottom: 16,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div
                  className="flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                    fontSize: 12,
                  }}
                >
                  TB
                </div>
                <input
                  type="text"
                  placeholder="Bagikan tips atau pertanyaan Anda..."
                  value={composeValue}
                  onChange={(e) => setComposeValue(e.target.value)}
                  className="flex-1 text-white placeholder:text-[#8A8A8A]"
                  style={{
                    height: 40,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '0 16px',
                    fontSize: 12,
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                />
                <motion.button
                  whileHover={{ boxShadow: '0 0 16px rgba(74,16,99,0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  className="font-bold text-white flex-shrink-0"
                  style={{
                    height: 36,
                    padding: '0 16px',
                    background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  Posting
                </motion.button>
              </motion.div>

              {/* Discussion list */}
              <div
                className="overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                }}
              >
                {posts.map((post, i) => (
                  <PostItem key={post.id} post={post} delay={0.2 + i * 0.07} />
                ))}

                {/* Load more */}
                <div className="text-center" style={{ padding: '14px 20px' }}>
                  <button
                    style={{ fontSize: 12, color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                  >
                    Lihat 48 diskusi lainnya →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="flex flex-col" style={{ flex: '0 0 calc(30% - 10px)', gap: 16 }}>

            {/* WIDGET 1 — Profil */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center font-bold text-white"
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                    fontSize: 18,
                  }}
                >
                  TB
                </div>
                <p className="font-bold text-white text-center" style={{ fontSize: 14, marginTop: 10 }}>
                  Toko Berkah
                </p>
                <span
                  className="font-bold"
                  style={{
                    fontSize: 10,
                    background: 'rgba(0,255,255,0.15)',
                    color: '#00FFFF',
                    borderRadius: 20,
                    padding: '3px 12px',
                    marginTop: 6,
                  }}
                >
                  Anggota Aktif
                </span>
              </div>

              {/* Stats */}
              <div
                className="flex justify-around"
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {[{ val: '12', label: 'Postingan' }, { val: '89', label: 'Suka' }, { val: '3', label: 'Grup' }].map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <span className="font-bold text-white" style={{ fontSize: 18 }}>{s.val}</span>
                    <span style={{ fontSize: 9, color: '#8A8A8A', marginTop: 2 }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ borderColor: '#00FFFF', color: '#00FFFF' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/dashboard/pengaturan')}
                className="w-full text-white font-medium"
                style={{
                  marginTop: 14,
                  height: 36,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8,
                  fontSize: 11,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Edit Profil
              </motion.button>
            </motion.div>

            {/* WIDGET 2 — Grup Saya */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p className="font-bold text-white" style={{ fontSize: 13, marginBottom: 12 }}>Grup Saya</p>
              <div className="flex flex-col" style={{ gap: 0 }}>
                {[
                  { icon: '🌾', iconBg: 'rgba(0,255,127,0.12)', name: 'Sembako & Grosir', members: '4.821 anggota' },
                  { icon: '🍜', iconBg: 'rgba(255,215,0,0.12)', name: 'F&B Owners', members: '3.244 anggota' },
                ].map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderRadius = '8px'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{ width: 28, height: 28, borderRadius: 8, background: g.iconBg, fontSize: 14 }}
                    >
                      {g.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-white" style={{ fontSize: 12 }}>{g.name}</p>
                      <p style={{ fontSize: 10, color: '#8A8A8A' }}>{g.members}</p>
                    </div>
                    <ChevronRight size={12} color="#8A8A8A" />
                  </div>
                ))}
              </div>
              <button
                style={{ fontSize: 11, color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8, padding: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Jelajahi Lebih Banyak Grup →
              </button>
            </motion.div>

            {/* WIDGET 3 — Top Kontributor */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.26, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p className="font-bold text-white" style={{ fontSize: 13, marginBottom: 12 }}>Top Kontributor</p>
              <div className="flex flex-col">
                {contributors.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: i < contributors.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: c.rankEmoji ? 14 : 11, color: '#8A8A8A', width: 18, textAlign: 'center', flexShrink: 0 }}>
                      {c.rankEmoji ?? c.rank}
                    </span>
                    <div
                      className="flex items-center justify-center font-bold text-white flex-shrink-0"
                      style={{ width: 32, height: 32, borderRadius: '50%', background: c.avatarBg, fontSize: 11 }}
                    >
                      {c.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="text-white font-medium" style={{ fontSize: 12 }}>{c.name}</p>
                      <p style={{ fontSize: 10, color: '#8A8A8A' }}>{c.city}</p>
                    </div>
                    <span className="font-bold" style={{ fontSize: 10, color: '#FFD700', flexShrink: 0 }}>
                      {c.contributions}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* WIDGET 4 — Events */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.34, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p className="font-bold text-white" style={{ fontSize: 13, marginBottom: 12 }}>Event Mendatang</p>
              <div className="flex flex-col" style={{ gap: 12 }}>
                {events.map((ev, i) => (
                  <div key={i} className="flex items-start" style={{ gap: 10 }}>
                    {/* Date box */}
                    <div
                      className="flex flex-col items-center justify-center font-bold text-white flex-shrink-0"
                      style={{
                        width: 40,
                        height: 44,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                      }}
                    >
                      <span style={{ fontSize: 9, letterSpacing: '0.05em' }}>{ev.month}</span>
                      <span style={{ fontSize: 18, lineHeight: 1.1 }}>{ev.day}</span>
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        className="font-bold text-white"
                        style={{
                          fontSize: 12,
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {ev.title}
                      </p>
                      <p style={{ fontSize: 10, color: '#8A8A8A', marginTop: 3 }}>
                        {ev.time} · {ev.location}
                      </p>
                      <button
                        style={{ fontSize: 10, color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 4 }}
                        onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                      >
                        Daftar Gratis →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                style={{ fontSize: 11, color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer', marginTop: 10, padding: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Lihat Semua Event →
              </button>
            </motion.div>

          </div>
        </div>

        <div style={{ height: 40 }} />
      </main>
    </div>
  );
}
