Design main dashboard with glass cards, gradient accents, modern data visualization.

BACKGROUND:
- Full viewport gradient: #0F0F0F (top) → #1a0f2e (bottom)

TOP NAVBAR (64px, sticky, glass):
- Background: rgba(15, 15, 15, 0.85) + backdrop-filter blur(15px)
- Border-bottom: 1px rgba(255, 255, 255, 0.1)
- Display: flex, space-between, align-center
- Padding: 0 40px
- Left section:
  * RestockAI logo (white, 18px bold)
  * Store name "Toko Berkah" (16px, white, margin-left 32px)
- Center section:
  * Date range picker "01-30 Mei 2024" (14px, #E8E8E8, background glass)
  * Styled as: pill shape, 40px height, padding 8px 16px, border 1px rgba(255,255,255,0.2)
- Right section (flex, gap 16px):
  * Search icon button (24px, white, hover cyan glow)
  * Notification bell icon (24px, white)
    - Badge: Red dot (8px circle, #FF00FF or red neon)
    - Hover: Glow effect
  * User avatar circle (40x40px, gradient bg, initials "TB", white text)

LEFT SIDEBAR (240px, fixed, glass):
- Background: rgba(0, 0, 0, 0.4) + blur(10px)
- Border-right: 1px rgba(255, 255, 255, 0.1)
- Padding: 24px 16px
- Height: 100vh, overflow-y auto

SIDEBAR LOGO & BRANDING (top):
- Logo + "RestockAI" text (14px bold, white)
- Margin-bottom: 40px
- Hover: glow subtle

SIDEBAR NAV ITEMS (list, gap 8px):
Each nav item:
  * Padding: 12px 16px
  * Border-radius: 12px
  * Font: 14px, #E8E8E8
  * Cursor: pointer
  * Icon (24px) + label (space-between flex)
  * Hover state: BG rgba(255, 255, 255, 0.08), border 1px rgba(255,255,255,0.15)
  * Active state: 
    - BG gradient (#4A1063 → #8B4BBE)
    - Border-left: 3px #00FF7F
    - Text white bold
    - Glow: subtle shadow

Nav items:
- 🏠 Dashboard (active)
- 🧠 Prediksi Restok
- 💡 Rekomendasi AI
- 📦 Produk
- 📊 Inventori
- 🛒 Pembelian
- 💰 Penjualan
- 📈 Laporan
- 🔌 Integrasi
- ⚙️ Pengaturan

SIDEBAR BOTTOM:
- Margin-top: auto
- Divider: 1px rgba(255, 255, 255, 0.1)
- "Upgrade ke Pro" button:
  * Full width, 44px
  * Background: Gradient (#F5E04A → #FFD700)
  * Text: #0F0F0F bold, 13px, centered
  * Border-radius: 12px
  * Hover: Scale 1.05, glow
  * Margin-bottom: 16px
- User profile section:
  * Avatar: 36x36px circle, gradient bg
  * Name: "Toko Berkah" (12px white bold)
  * Role: "Pemilik" (10px, #E8E8E8)
  * Flex, align-center, gap 12px

MAIN CONTENT AREA (right of sidebar):
- Padding: 32px 40px
- Background: transparent (inherits viewport gradient)

TOP SECTION - KPI CARDS (4 columns, gap 20px, margin-bottom 40px):
Each KPI card:
  * Background: Glass — rgba(255, 255, 255, 0.06) + blur(12px)
  * Border: 1px rgba(255, 255, 255, 0.15)
  * Border-radius: 20px
  * Padding: 24px
  * Min-height: 140px
  * Display: flex, flex-direction column, justify-space-between
  * Hover: Border color cyan, BG +5% opacity, shadow glow
  * Transition: all 0.3s ease

KPI CARD 1: Total Produk
- Icon (top-left): 📦 (32px emoji)
- Icon bg circle: 60x60px, rgba(245, 224, 74, 0.2)
- Label (small, top-right): "TOTAL PRODUK" (10px, uppercase, #E8E8E8)
- Value (bottom): "1.248" (32px bold, gradient text #00FF7F → #00FFFF)
- Subtitle (below value): "+23 produk baru" (12px, #E8E8E8)

KPI CARD 2: Nilai Stok
- Icon: 💰 (32px)
- Icon bg: rgba(245, 200, 192, 0.2) (pinkish)
- Label: "NILAI STOK"
- Value: "Rp 48.25M" (32px bold, white)
- Subtitle: "Total inventory"

KPI CARD 3: Prediksi Stockout (DANGER CARD)
- Icon: ⚠ (32px, #FF00FF or red neon)
- Icon bg: rgba(255, 0, 127, 0.2)
- Label: "PREDIKSI STOCKOUT"
- Value: "23 Produk" (32px bold, red/pink neon color #FF00FF or #E63220)
- Subtitle: "⚠ Peringatan" (red)
- Card border: Slightly more visible, 1px #FF00FF at 40% opacity
- Background: Slightly more saturated to draw attention

KPI CARD 4: Overstock
- Icon: 📈 (32px, #00FF7F green neon)
- Icon bg: rgba(0, 255, 127, 0.2)
- Label: "OVERSTOCK"
- Value: "17 Produk" (32px bold, #00FF7F)
- Subtitle: "Perlu dioptimalkan"

CHART SECTION (2 columns, gap 20px, margin-bottom 40px):
Left chart: "Prediksi Permintaan vs Stok"
- Container: Glass card, 100% width of left column
- Background: rgba(255, 255, 255, 0.06) + blur(12px)
- Border: 1px rgba(255, 255, 255, 0.15)
- Border-radius: 20px
- Padding: 28px
- Header (flex, justify-space-between):
  * Title: "PREDIKSI PERMINTAAN VS STOK" (14px bold, white)
  * AI badge: "🧠 AI-Powered" (gradient bg, white text, 10px, pill)
- Chart area: 280px height
  * Line chart with 2 lines:
    - Permintaan: Gradient color cyan → magenta (#00FFFF → #FF00FF)
    - Stok: Gradient peach → yellow (#F5C897 → #FFD700)
  * X-axis: Dates (5-8 May, 10 May, 22 May, 30 May)
  * Y-axis: Values with grid lines (very light, rgba(255,255,255,0.05))
  * Smooth curves (not jagged)
  * Area under curves: Slight fill opacity (20-30%), same gradient as line
  * Hover tooltip: Glass bg, blur, border glow

Right chart: "Status Stok Produk"
- Container: Glass card, same styling
- Header: Title + subtitle
- Donut chart (center: 200x200px):
  * Segments:
    - Aman (70%): Gradient #00FF7F → cyan
    - Perlu Restok (18%): Gradient yellow → gold
    - Hampir Habis (9%): Gradient orange → red
    - Overstock (3%): Gradient pink → magenta
  * Center text: "1.248" (20px bold, white) + "Total SKU" (11px, #E8E8E8)
  * Hover segment: Glow + slight rotation
- Legend below (4 items, flex wrap):
  * Color dot + label + percentage
  * Font: 13px

RECOMMENDATION TABLE (below charts, margin-top 40px):
- Container: Glass card, full width
- Background: rgba(255, 255, 255, 0.06) + blur(12px)
- Border: 1px rgba(255, 255, 255, 0.15)
- Border-radius: 20px
- Padding: 28px
- Header:
  * Title: "REKOMENDASI RESTOK" (14px bold, white)
  * View all link (right, cyan, 12px)
- Table (5 rows visible, scrollable):
  * Header row: bg rgba(255, 255, 255, 0.08), text uppercase 11px bold
  * Columns: Produk | Kategori | Stok | Prediksi | Rekomendasi | Aksi
  * Data rows:
    - Row 1: Beras Premium 5kg | Sembako | 12 pcs (progress bar 20% green) | 3 hari | 50 pcs | [Buat PO button]
    - Row 2: Minyak Goreng 2L | Sembako | 5 pcs (progress bar 10% yellow) | 2 hari | 30 pcs | [Buat PO button]
    - Row 3: Gula Pasir 1kg | Sembako | 3 pcs (progress bar 5% red) | 1 hari | 20 pcs | [Buat PO button]
  * Row hover: BG rgba(255, 255, 255, 0.08)
  * Progress bars: Gradient filled (green → yellow → red by percentage)
  * "Buat PO" button:
    - Small: 32px height
    - Background: Gradient (#4A1063 → #8B4BBE)
    - Text: white 12px bold
    - Border-radius: 8px
    - Hover: glow

BOTTOM METRICS ROW (3 columns, gap 20px):
Same as KPI cards above, showing:
- Penjualan Bulan Ini: Rp 2.45M ↑ 12.4%
- Laba Kotor: Rp 980K ↑ 15%
- Gross Margin: 40% ↑ 2.5%

OVERALL FEEL:
Premium, modern, data-rich but clean. Glass + gradients everywhere. Neon accents draw attention to important metrics. Feels like Vercel or Linear dashboard — not corporate, not boring.

INTERACTIVE DETAILS:
- Smooth hover transitions on all cards
- Glow effects on interactive elements
- Chart animations on page load (lines draw, donut segments fill)
- Progress bars animate from 0% to actual value
- Cards feel 3D-ish due to glass + shadows