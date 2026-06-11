import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BedDouble,
  Building2,
  CreditCard,
  LayoutDashboard,
  UserRound,
} from 'lucide-react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell.jsx';
import { DashboardView } from './features/dashboard/DashboardView.jsx';
import { PropertiesView } from './features/properties/PropertiesView.jsx';
import { RoomsView } from './features/rooms/RoomsView.jsx';
import { ResidentsView } from './features/residents/ResidentsView.jsx';
import { BillingView } from './features/billing/BillingView.jsx';
import { ComplaintsView } from './features/complaints/ComplaintsView.jsx';
import { ReportsView } from './features/reports/ReportsView.jsx';
import { LoginView } from './features/auth/LoginView.jsx';
import { useLedgerStore } from './hooks/useLedgerStore.js';
import { ScenarioBanner, ScenarioModal } from './components/ui/ScenarioModal.jsx';
import { sequenceScenarios } from './data/sequenceScenarios.js';

const navItems = [
  { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', path: '/properti', label: 'Properti', icon: Building2 },
  { id: 'rooms', path: '/kamar', label: 'Kamar', icon: BedDouble },
  { id: 'residents', path: '/penghuni', label: 'Penghuni', icon: UserRound },
  { id: 'billing', path: '/keuangan', label: 'Keuangan', icon: CreditCard },
  { id: 'complaints', path: '/komplain', label: 'Komplain', icon: AlertTriangle },
  { id: 'reports', path: '/laporan', label: 'Laporan', icon: BarChart3 },
];

const pageCopy = {
  dashboard: {
    title: 'Dashboard Ringkasan',
    subtitle: 'Selamat datang kembali, Admin Utama. Berikut overview operasional kos Anda hari ini.',
  },
  properties: {
    title: 'Manajemen Properti',
    subtitle: 'Kelola lokasi kos dari proses tambah, lihat detail, update, sampai hapus.',
  },
  rooms: {
    title: 'Manajemen Kamar',
    subtitle: 'Kelola kamar, status ketersediaan, dan deassign hunian aktif.',
  },
  residents: {
    title: 'Manajemen Penghuni',
    subtitle: 'Kelola data penghuni dan proses assign kamar tersedia.',
  },
  billing: {
    title: 'Keuangan',
    subtitle: 'Buat tagihan penghuni dan catat pembayaran menjadi lunas.',
  },
  complaints: {
    title: 'Komplain',
    subtitle: 'Pantau keluhan penghuni dari masuk, diproses, hingga selesai.',
  },
  reports: {
    title: 'Laporan Keuangan',
    subtitle: 'Sajikan rekap pemasukan, pengeluaran, laba/rugi, dan ekspor laporan.',
  },
};

const defaultBoundaryByView = {
  dashboard: 'dashboard.index',
  properties: 'properti.index',
  rooms: 'kamar.index',
  residents: 'penghuni.index',
  billing: 'pembayaran.index',
  complaints: 'keluhan.index',
  reports: 'laporan_keuangan.index',
};

const routeByPath = {
  '/dashboard': 'dashboard',
  '/properti': 'properties',
  '/kamar': 'rooms',
  '/penghuni': 'residents',
  '/keuangan': 'billing',
  '/komplain': 'complaints',
  '/laporan': 'reports',
};

const residentNavItems = [
  { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'complaints', path: '/komplain', label: 'Komplain', icon: AlertTriangle },
  { id: 'billing', path: '/keuangan', label: 'Keuangan', icon: CreditCard },
];

function AdminOnly({ user, children }) {
  return user?.role === 'ADMIN' ? children : <Navigate to="/dashboard" replace />;
}

export default function App() {
  const location = useLocation();
  const [toast, setToast] = useState('');
  const [scenarioModalOpen, setScenarioModalOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState(null);
  const [activeBoundary, setActiveBoundary] = useState('dashboard.index');
  const [sessionUser, setSessionUser] = useState(() => {
    const raw = window.localStorage.getItem('ledger_session_user');
    return raw ? JSON.parse(raw) : null;
  });
  const store = useLedgerStore();
  const activeView = routeByPath[location.pathname] ?? 'dashboard';
  const page = pageCopy[activeView];
  const moduleScenarios = sequenceScenarios[activeView] ?? [];
  const scenarios = moduleScenarios.filter((scenario) => scenario.boundary === activeBoundary);
  const isLoginRoute = location.pathname === '/login';
  const visibleNavItems = sessionUser?.role === 'PENGHUNI' ? residentNavItems : navItems;

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__ledgerToast);
    window.__ledgerToast = window.setTimeout(() => setToast(''), 2200);
  };

  const login = (user) => {
    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      residentId: user.residentId,
    };
    try {
      window.localStorage.setItem('ledger_session_user', JSON.stringify(session));
      setSessionUser(session);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  };

  const logout = () => {
    window.localStorage.removeItem('ledger_session_user');
    setSessionUser(null);
    setActiveScenario(null);
    setScenarioModalOpen(false);
  };

  useEffect(() => {
    const openScenarioPicker = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

      if (event.key === '/' && !isTyping && !isLoginRoute) {
        event.preventDefault();
        setScenarioModalOpen(true);
      }
    };

    window.addEventListener('keydown', openScenarioPicker);
    return () => window.removeEventListener('keydown', openScenarioPicker);
  }, [isLoginRoute]);

  useEffect(() => {
    setActiveScenario(null);
    setActiveBoundary(defaultBoundaryByView[activeView] ?? `${activeView}.index`);
  }, [activeView, location.pathname]);

  const routeProps = useMemo(
    () => ({ store, notify, currentUser: sessionUser, onBoundaryChange: setActiveBoundary }),
    [store, sessionUser],
  );

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            sessionUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginView onLogin={login} />
            )
          }
        />
        <Route
          path="*"
          element={
            sessionUser ? (
              <AppShell
                navItems={visibleNavItems}
                title={page.title}
                subtitle={page.subtitle}
                user={sessionUser}
                onLogout={logout}
                onOpenScenarios={() => setScenarioModalOpen(true)}
              >
                <ScenarioBanner scenario={activeScenario} onClear={() => setActiveScenario(null)} />
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardView {...routeProps} />} />
                  <Route path="/properti" element={<AdminOnly user={sessionUser}><PropertiesView {...routeProps} /></AdminOnly>} />
                  <Route path="/kamar" element={<AdminOnly user={sessionUser}><RoomsView {...routeProps} /></AdminOnly>} />
                  <Route path="/penghuni" element={<AdminOnly user={sessionUser}><ResidentsView {...routeProps} /></AdminOnly>} />
                  <Route path="/keuangan" element={<BillingView {...routeProps} />} />
                  <Route path="/komplain" element={<ComplaintsView {...routeProps} />} />
                  <Route path="/laporan" element={<AdminOnly user={sessionUser}><ReportsView {...routeProps} /></AdminOnly>} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppShell>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      {scenarioModalOpen && !isLoginRoute ? (
        <ScenarioModal
          title={page.title}
          boundary={activeBoundary}
          scenarios={scenarios.length ? scenarios : moduleScenarios}
          onClose={() => setScenarioModalOpen(false)}
          onSelect={(scenario) => {
            setActiveScenario(scenario);
            setScenarioModalOpen(false);
            notify(scenario.message);
          }}
        />
      ) : null}
      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
