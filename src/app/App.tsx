import { BrowserRouter, Routes, Route } from 'react-router';
import LandingPage from './pages/LandingPage';
import OnboardingStep1 from './components/OnboardingStep1';
import OnboardingStep2 from './components/OnboardingStep2';
import OnboardingStep3 from './components/OnboardingStep3';
import OnboardingSuccess from './components/OnboardingSuccess';
import Dashboard from './pages/Dashboard';
import PrediksiRestok from './pages/PrediksiRestok';
import Inventori from './pages/Inventori';
import PurchaseOrder from './pages/PurchaseOrder';
import Laporan from './pages/Laporan';
import Integrasi from './pages/Integrasi';
import Pricing from './pages/Pricing';
import Notifikasi from './pages/Notifikasi';
import RekomendasiAI from './pages/RekomendasiAI';
import Produk from './pages/Produk';
import Penjualan from './pages/Penjualan';
import Pengaturan from './pages/Pengaturan';
import SupplierTerbaik from './pages/SupplierTerbaik';
import BeritaUMKM from './pages/BeritaUMKM';
import Komunitas from './pages/Komunitas';
import SearchPage from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingStep1 />} />
        <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
        <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
        <Route path="/onboarding/success" element={<OnboardingSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/prediksi" element={<PrediksiRestok />} />
        <Route path="/dashboard/inventori" element={<Inventori />} />
        <Route path="/dashboard/pembelian" element={<PurchaseOrder />} />
        <Route path="/dashboard/laporan" element={<Laporan />} />
        <Route path="/dashboard/integrasi" element={<Integrasi />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard/notifikasi" element={<Notifikasi />} />
        <Route path="/dashboard/rekomendasi" element={<RekomendasiAI />} />
        <Route path="/dashboard/produk" element={<Produk />} />
        <Route path="/dashboard/penjualan" element={<Penjualan />} />
        <Route path="/dashboard/pengaturan" element={<Pengaturan />} />
        <Route path="/dashboard/supplier" element={<SupplierTerbaik />} />
        <Route path="/dashboard/berita" element={<BeritaUMKM />} />
        <Route path="/dashboard/komunitas" element={<Komunitas />} />
        <Route path="/dashboard/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}