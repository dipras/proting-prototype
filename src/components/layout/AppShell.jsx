import React from 'react';
import { Bell, Building2, Command, LogOut, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function AppShell({ navItems, title, subtitle, user, onLogout, onOpenScenarios, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Building2 size={25} aria-hidden="true" />
          </div>
          <div>
            <strong>Properti Ledger</strong>
            <span>Manajemen Kos</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              key={item.id}
              to={item.path}
            >
              <item.icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="nav-link logout" type="button" onClick={onLogout}>
          <LogOut size={20} aria-hidden="true" />
          <span>Keluar</span>
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div />
          <div className="topbar-actions">
            <button className="utility-button" type="button" onClick={onOpenScenarios} title="Variasi halaman (/)">
              <Command size={18} aria-hidden="true" />
              <span>Variasi</span>
              <kbd>/</kbd>
            </button>
            <button className="icon-button" type="button" title="Notifikasi">
              <Bell size={21} aria-hidden="true" />
            </button>
            <button className="icon-button" type="button" title="Pengaturan">
              <Settings size={21} aria-hidden="true" />
            </button>
            <button className="icon-button logout-topbar" type="button" onClick={onLogout} title="Keluar">
              <LogOut size={21} aria-hidden="true" />
            </button>
            <div className="divider" />
            <div className="user-chip">
              <div>
                <strong>{user?.name ?? 'User'}</strong>
                <span>{user?.role === 'ADMIN' ? 'Super Admin' : 'Penghuni'}</span>
              </div>
              <div className="avatar">{getInitials(user?.name)}</div>
            </div>
          </div>
        </header>

        <section className="content">
          <div className="page-heading">
            <div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}

function getInitials(name = 'User') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
