import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { ChevronRight, Pin, Store, Utensils, Boxes, Shirt, Heart, MessageCircle, Bookmark, Medal, Star } from 'lucide-react';
import React from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Group {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  name: string;
  members: string;
  activity: string;
  activityDot: string;
  activityColor: string;
  tags: { label: string; color: '#1A1A1B'}[];
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
  rankMedalColor?: string;
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
    icon: <Store size={20} color="#10B981" />,
    iconBg: 'rgba(16,185,129,0.15)',
    name: 'Sembako & Grosir Indonesia',
    members: '4.821',
    activity: 'Aktif', activityDot: '#22C55E',
    activitycolor: '#1A1A1B',
    tags: [
      { label: 'Sembako', color: '#1A1A1B' },
      { label: 'Grosir', color: '#1A1A1B' },
      { label: 'Harga Pasar', color: '#1A1A1B' },
    ],
    previewAvatar: 'BK',
    previewName: 'Budi K',
    previewText: 'Ada yang tau harga beras premium GudangAda bulan ini? Naik ga ya...',
    previewTime: '15 menit lalu',
    joined: true,
  },
  {
    id: 'g2',
    icon: <Utensils size={20} color="#F59E0B" />,
    iconBg: 'rgba(245,158,11,0.15)',
    name: 'F&B Owners Indonesia',
    members: '3.244',
    activity: 'Aktif', activityDot: '#22C55E',
    activitycolor: '#1A1A1B',
    tags: [
      { label: 'F&B', color: '#1A1A1B' },
      { label: 'Kuliner', color: '#1A1A1B' },
      { label: 'Tips Menu', color: '#1A1A1B' },
    ],
    previewAvatar: 'SR',
    previewName: 'Siti R',
    previewText: 'Supplier frozen food yang reliable di Jakarta ada yang rekomen?',
    previewTime: '42 menit lalu',
    joined: true,
  },
  {
    id: 'g3',
    icon: <Boxes size={20} color="#4F46E5" />,
    iconBg: 'rgba(79,70,229,0.15)',
    name: 'Tips Manajemen Stok',
    members: '6.182',
    activity: 'Sangat Aktif', activityDot: '#22C55E',
    activitycolor: '#1A1A1B',
    tags: [
      { label: 'Manajemen', color: '#1A1A1B' },
      { label: 'Stok', color: '#1A1A1B' },
      { label: 'Tips', color: '#1A1A1B' },
    ],
    previewAvatar: 'RA',
    previewName: 'Rudi A',
    previewText: 'Cara saya menghemat 30% biaya inventori dengan Restock AI...',
    previewTime: '1 jam lalu',
    joined: false,
  },
  {
    id: 'g4',
    icon: <Shirt size={20} color="#EC4899" />,
    iconBg: 'rgba(236,72,153,0.15)',
    name: 'Fashion UMKM Nusantara',
    members: '2.108',
    activity: 'Cukup Aktif', activityDot: '#EAB308',
    activitycolor: '#1A1A1B',
    tags: [
      { label: 'Fashion', color: '#1A1A1B' },
      { label: 'Tekstil', color: '#1A1A1B' },
      { label: 'Trend', color: '#1A1A1B' },
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
    avatarBg: 'linear-gradient(135deg, #FFE16F, #98E2FD)',
    avatarText: 'RD',
    name: 'Rudi Dharma',
    badge: 'Top Kontributor',
    badgecolor: '#1A1A1B',
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
    avatarBg: 'linear-gradient(135deg, #00804A, #D1F07B)',
    avatarText: 'SN',
    name: 'Siti Nurhaliza',
    badge: 'Anggota Baru',
    badgecolor: '#1A1A1B',
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
    avatarBg: 'linear-gradient(135deg, #007A8A, #98E2FD)',
    avatarText: 'AH',
    name: 'Anton Hakim',
    badge: 'Top Kontributor',
    badgecolor: '#1A1A1B',
    badgeBg: 'rgba(255,215,0,0.15)',
    group: 'Tips Manajemen',
    time: '5 jam lalu',
    title: 'Prediksi AI Restock AI meleset atau akurat? Diskusi jujur setelah 3 bulan pakai',
    preview: 'Sudah 3 bulan pakai fitur prediksi stok. Overall akurasi ~87%, tapi ada beberapa kategori yang masih miss...',
    likes: '198',
    comments: '89',
    saves: '76',
  },
  {
    id: 'p4',
    avatarBg: 'linear-gradient(135deg, #8A004A, #1A1A1B)',
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
  { rank: '1', rankMedalColor: '#FFD700', avatarBg: 'linear-gradient(135deg, #FFE16F, #98E2FD)', initials: 'RD', name: 'Rudi Dharma', city: 'Jakarta', contributions: '284' },
  { rank: '2', rankMedalColor: '#C0C0C0', avatarBg: 'linear-gradient(135deg, #00804A, #D1F07B)', initials: 'AH', name: 'Anton Hakim', city: 'Bandung', contributions: '198' },
  { rank: '3', rankMedalColor: '#CD7F32', avatarBg: 'linear-gradient(135deg, #007A8A, #98E2FD)', initials: 'BK', name: 'Budi Kusuma', city: 'Surabaya', contributions: '167' },
  { rank: '4', rankMedalColor: undefined, avatarBg: 'linear-gradient(135deg, #5A5A00, #AAAA00)', initials: 'SR', name: 'Siti R.', city: 'Medan', contributions: '143' },
  { rank: '5', rankMedalColor: undefined, avatarBg: 'linear-gradient(135deg, #7A004A, #CC0077)', initials: 'ML', name: 'Maya L.', city: 'Yogyakarta', contributions: '98' },
];

const events: Event[] = [
  { month: 'JUN', day: '5', title: 'Webinar: Manajemen Stok UMKM di Era Digital', time: '19.00 WIB', location: 'Via Zoom' },
  { month: 'JUN', day: '12', title: 'Workshop Offline: Strategi Harga untuk Toko Sembako', time: '09.00 WIB', location: 'Jakarta' },
  { month: 'JUN', day: '20', title: 'Kopdar Restock AI Community — Meet & Greet', time: '15.00 WIB', location: 'Jakarta' },
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
        background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${joined ? 'rgba(0,255,127,0.3)' : hovered ? 'rgba(152, 226, 253,0.35)' : 'rgba(0, 0, 0, 0.05)'}`,
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
          style={{ width: 44, height: 44, borderRadius: 12, background: group.iconBg, fontSize: 22 }}
        >
          {group.icon}
        </div>
        <div>
          <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 14 }}>{group.name}</p>
          <div className="flex items-center" style={{ gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 11, color: '#1A1A1B' }}>{group.members} anggota</span>
            <span className="flex items-center gap-1" style={{ fontSize: 10, color: '#1A1A1B'}}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: group.activityDot }} />
              {group.activity}
            </span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap" style={{ gap: 6, marginTop: 10 }}>
        {group.tags.map((tag) => (
          <span
            key={tag.label}
            style={{
              background: 'rgba(0, 0, 0, 0.04)',
              color: '#1A1A1B',
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
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 font-bold text-[#1A1A1B]"
          style={{
            width: 24, height: 24, borderRadius: '50%',
            background: '#FFE16F',
            fontSize: 9,
          }}
        >
          {group.previewAvatar}
        </div>
        <p
          style={{
            fontSize: 11,
            color: '#1A1A1B',
            flex: 1,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          <span style={{ color: '#1A1A1B', fontWeight: 600 }}>{group.previewName}: </span>
          {group.previewText}
        </p>
        <span style={{ fontSize: 10, color: '#1A1A1B', flexShrink: 0, marginLeft: 4 }}>
          {group.previewTime}
        </span>
      </div>

      {/* Action button */}
      <motion.button
        whileHover={!joined ? { boxShadow: '0 0 16px rgba(16,185,129,0.35)' } : {}}
        whileTap={{ scale: 0.97 }}
        onClick={() => setJoined(!joined)}
        className="w-full font-bold"
        style={{
          marginTop: 12,
          height: 36,
          borderRadius: 12,
          fontSize: 11,
          cursor: joined ? 'default' : 'pointer',
          background: 'rgba(16,185,129,0.15)',
          border: '1px solid rgba(0,255,127,0.3)',
          color: '#1A1A1B',
          transition: 'all 0.2s',
        }}
      >
        {joined ? 'Bergabung ' : '+ Bergabung'}
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
        borderColor: 'rgba(0, 0, 0, 0.03)',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <div className="flex items-start" style={{ gap: 12 }}>
        {/* Avatar */}
        <div
          className="flex items-center justify-center font-bold text-[#1A1A1B] flex-shrink-0"
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
            <span className="font-bold text-[#1A1A1B]" style={{ fontSize: 13 }}>{post.name}</span>
            {post.badge && (
              <span
                className="inline-flex items-center gap-1 font-bold"
                style={{
                  fontSize: 9,
                  background: post.badgeBg,
                  color: '#1A1A1B',
                  borderRadius: 20,
                  padding: '2px 8px',
                }}
              >
                {post.badge === 'Top Kontributor' && <Star size={9} fill="#1A1A1B" />}
                {post.badge}
              </span>
            )}
            <span style={{ fontSize: 11, color: '#1A1A1B' }}>· {post.group} · {post.time}</span>
          </div>

          {/* Title */}
          <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 14, marginTop: 8, lineHeight: 1.4 }}>
            {post.title}
          </p>

          {/* Preview */}
          {post.preview && (
            <p
              style={{
                fontSize: 12,
                color: '#1A1A1B',
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
              className="flex items-center gap-1"
              style={{
                fontSize: 11,
                color: '#1A1A1B',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.15s',
              }}
            >
              <Heart size={13} fill={liked ? '#1A1A1B' : 'none'} />
              {post.likes} suka
            </button>
            <span className="flex items-center gap-1" style={{ fontSize: 11, color: '#1A1A1B' }}>
              <MessageCircle size={13} />
              {post.comments} komentar
            </span>
            {post.saves && (
              <span className="flex items-center gap-1" style={{ fontSize: 11, color: '#1A1A1B' }}>
                <Bookmark size={13} />
                {post.saves} simpan
              </span>
            )}
            <button
              style={{
                fontSize: 11,
                color: '#1A1A1B',
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
      style={{ background: '#f8fafc' }}
    >
      <Sidebar activePage="komunitas" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 40px' }}>

        {/* ── Page Header ── */}
        <div>
          <h1 className="font-bold text-[#1A1A1B]" style={{ fontSize: 20 }}>Komunitas Restock AI</h1>
          <p style={{ fontSize: 13, color: '#1A1A1B', marginTop: 4 }}>
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
            background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: 12,
            padding: '16px 24px',
          }}
        >
          {[
            { value: '12.483', label: 'Member Aktif', color: '#1A1A1B' },
            { value: '847', label: 'Diskusi Minggu Ini', color: '#1A1A1B' },
            { value: '234', label: 'Tips Dibagikan', color: '#1A1A1B' },
            { value: '98%', label: 'Pertanyaan Terjawab', color: '#1A1A1B' },
          ].map((stat, i) => (
            <div key={i} className="flex" style={{ flex: 1, alignItems: 'stretch' }}>
              {i > 0 && (
                <div style={{ width: 1, background: 'rgba(0, 0, 0, 0.04)', marginRight: 0 }} />
              )}
              <div className="flex flex-col items-center" style={{ flex: 1 }}>
                <span
                  className="font-bold"
                  style={
                    stat.gradient
                      ? {
                          fontSize: 24,
                          background: 'linear-gradient(135deg, #98E2FD, #98E2FD)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : { fontSize: 24, color: '#1A1A1B'}
                  }
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: 11, color: '#1A1A1B', marginTop: 4 }}>{stat.label}</span>
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
              <h2 className="font-bold text-[#1A1A1B]" style={{ fontSize: 14, marginBottom: 16 }}>
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
                  <h2 className="font-bold text-[#1A1A1B]" style={{ fontSize: 14 }}>Diskusi Populer</h2>
                  <span style={{ fontSize: 11, color: '#1A1A1B' }}>Trending minggu ini</span>
                </div>
                <button
                  style={{ fontSize: 12, color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer' }}
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
                  background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  marginBottom: 16,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.04)'; }}
              >
                <div
                  className="flex items-center justify-center font-bold text-[#1A1A1B] flex-shrink-0"
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#FFE16F',
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
                  className="flex-1 text-[#1A1A1B] placeholder:text-[#8A8A8A]"
                  style={{
                    height: 40,
                    background: '#f8fafc',
                    borderRadius: 12,
                    padding: '0 16px',
                    fontSize: 12,
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)'; }}
                />
                <motion.button
                  whileHover={{ boxShadow: '0 0 16px rgba(255, 225, 111,0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  className="font-bold text-[#1A1A1B] flex-shrink-0"
                  style={{
                    height: 36,
                    padding: '0 16px',
                    background: '#FFE16F',
                    border: 'none',
                    borderRadius: 12,
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
                  background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 12,
                }}
              >
                {posts.map((post, i) => (
                  <PostItem key={post.id} post={post} delay={0.2 + i * 0.07} />
                ))}

                {/* Load more */}
                <div className="text-center" style={{ padding: '14px 20px' }}>
                  <button
                    style={{ fontSize: 12, color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer' }}
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
                background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center font-bold text-[#1A1A1B]"
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: '#FFE16F',
                    fontSize: 18,
                  }}
                >
                  TB
                </div>
                <p className="font-bold text-[#1A1A1B] text-center" style={{ fontSize: 14, marginTop: 10 }}>
                  Toko Berkah
                </p>
                <span
                  className="font-bold"
                  style={{
                    fontSize: 10,
                    background: 'rgba(0,255,255,0.15)',
                    color: '#1A1A1B',
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
                  borderTop: '1px solid #e2e8f0',
                }}
              >
                {[{ val: '12', label: 'Postingan' }, { val: '89', label: 'Suka' }, { val: '3', label: 'Grup' }].map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <span className="font-bold text-[#1A1A1B]" style={{ fontSize: 18 }}>{s.val}</span>
                    <span style={{ fontSize: 9, color: '#1A1A1B', marginTop: 2 }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ bordercolor: '#1A1A1B', color: '#1A1A1B' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/dashboard/pengaturan')}
                className="w-full text-[#1A1A1B] font-medium"
                style={{
                  marginTop: 14,
                  height: 36,
                  background: '#f8fafc',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 12,
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
                background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 13, marginBottom: 12 }}>Grup Saya</p>
              <div className="flex flex-col" style={{ gap: 0 }}>
                {[
                  { icon: <Store size={20} color="#10B981" />, iconBg: 'rgba(16,185,129,0.15)', name: 'Sembako & Grosir', members: '4.821 anggota' },
                  { icon: <Utensils size={20} color="#F59E0B" />, iconBg: 'rgba(245,158,11,0.15)', name: 'F&B Owners', members: '3.244 anggota' },
                ].map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{
                      gap: 10,
                      padding: '8px 0',
                      boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderRadius = '8px'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{ width: 28, height: 28, borderRadius: 12, background: g.iconBg, fontSize: 14 }}
                    >
                      {g.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-[#1A1A1B]" style={{ fontSize: 12 }}>{g.name}</p>
                      <p style={{ fontSize: 10, color: '#1A1A1B' }}>{g.members}</p>
                    </div>
                    <ChevronRight size={12} color="#8A8A8A" />
                  </div>
                ))}
              </div>
              <button
                style={{ fontSize: 11, color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8, padding: 0 }}
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
                background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 13, marginBottom: 12 }}>Top Kontributor</p>
              <div className="flex flex-col">
                {contributors.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: i < contributors.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none',
                    }}
                  >
                    <span className="flex items-center justify-center" style={{ fontSize: 11, color: '#1A1A1B', width: 18, flexShrink: 0 }}>
                      {c.rankMedalColor ? <Medal size={16} color={c.rankMedalColor} /> : c.rank}
                    </span>
                    <div
                      className="flex items-center justify-center font-bold text-[#1A1A1B] flex-shrink-0"
                      style={{ width: 32, height: 32, borderRadius: '50%', background: c.avatarBg, fontSize: 11 }}
                    >
                      {c.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="text-[#1A1A1B] font-medium" style={{ fontSize: 12 }}>{c.name}</p>
                      <p style={{ fontSize: 10, color: '#1A1A1B' }}>{c.city}</p>
                    </div>
                    <span className="font-bold" style={{ fontSize: 10, color: '#1A1A1B', flexShrink: 0 }}>
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
                background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 13, marginBottom: 12 }}>Event Mendatang</p>
              <div className="flex flex-col" style={{ gap: 12 }}>
                {events.map((ev, i) => (
                  <div key={i} className="flex items-start" style={{ gap: 10 }}>
                    {/* Date box */}
                    <div
                      className="flex flex-col items-center justify-center font-bold text-[#1A1A1B] flex-shrink-0"
                      style={{
                        width: 40,
                        height: 44,
                        borderRadius: 12,
                        background: '#FFE16F',
                      }}
                    >
                      <span style={{ fontSize: 9, letterSpacing: '0.05em' }}>{ev.month}</span>
                      <span style={{ fontSize: 18, lineHeight: 1.1 }}>{ev.day}</span>
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        className="font-bold text-[#1A1A1B]"
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
                      <p style={{ fontSize: 10, color: '#1A1A1B', marginTop: 3 }}>
                        {ev.time} · {ev.location}
                      </p>
                      <button
                        style={{ fontSize: 10, color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 4 }}
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
                style={{ fontSize: 11, color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer', marginTop: 10, padding: 0 }}
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
