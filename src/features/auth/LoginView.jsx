import React, { useState } from 'react';
import { Building2, LogIn } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { FormField } from '../../components/ui/FormField.jsx';
import { authUsers } from '../../data/initialData.js';

export function LoginView({ onLogin }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setMessage('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const email = String(form.email ?? '').trim();
    const password = String(form.password ?? '');

    if (!email || !password) {
      setMessage('Email dan password wajib diisi');
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      const user = authUsers.find((item) => item.email === email);

      if (!user || user.password !== password) {
        setMessage('Email atau password salah');
        setIsSubmitting(false);
        return;
      }

      if (user.status !== 'aktif') {
        setMessage('Akun tidak aktif');
        setIsSubmitting(false);
        return;
      }

      const result = onLogin(user);
      if (!result.ok) {
        setMessage('tampilkan pesan gagal masuk');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
    }, 250);
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark">
            <Building2 size={26} aria-hidden="true" />
          </div>
          <div>
            <strong>Properti Ledger</strong>
            <span>Manajemen Kos</span>
          </div>
        </div>

        <div className="login-heading">
          <span className="boundary-chip">auth.login</span>
          <h1>Masuk</h1>
          <p>tampilkan form login</p>
        </div>

        {message ? <div className="login-alert">{message}</div> : null}

        <form className="form-grid" onSubmit={submit}>
          <FormField label="Email">
            <input name="email" type="email" placeholder="admin@propertiledger.test" autoComplete="email" />
          </FormField>
          <FormField label="Password">
            <input name="password" type="password" placeholder="Masukkan password" autoComplete="current-password" />
          </FormField>
          <Button type="submit" className="login-submit" disabled={isSubmitting}>
            <LogIn size={18} /> {isSubmitting ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        <div className="credential-box">
          <strong>Akun demo</strong>
          <span>Admin: admin@propertiledger.test / admin123</span>
          <span>Penghuni: penghuni@propertiledger.test / penghuni123</span>
        </div>
      </section>
    </main>
  );
}
