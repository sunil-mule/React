import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css';

export default function UserProfile({ onClose }) {
  const { currentUser, login, register, logout, updateProfile } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [editMode, setEditMode] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [regError, setRegError] = useState('');

  const [editName, setEditName] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const result = login(loginForm);
    if (!result.success) setLoginError(result.error);
  }

  function handleRegister(e) {
    e.preventDefault();
    setRegError('');
    if (!regForm.name.trim()) return setRegError('Name is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) return setRegError('Enter a valid email.');
    if (regForm.password.length < 6) return setRegError('Password must be at least 6 characters.');
    if (regForm.password !== regForm.confirm) return setRegError('Passwords do not match.');
    const result = register(regForm);
    if (!result.success) setRegError(result.error);
  }

  function handleUpdateProfile(e) {
    e.preventDefault();
    if (!editName.trim()) return;
    updateProfile({ name: editName });
    setEditMode(false);
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 2500);
  }

  function handleLogout() {
    logout();
    onClose();
  }

  if (currentUser) {
    return (
      <div className="up-overlay" onClick={onClose}>
        <div className="up-panel" onClick={e => e.stopPropagation()}>
          <button className="up-close" onClick={onClose} aria-label="Close">✕</button>
          <div className="up-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
          <h2 className="up-name">{currentUser.name}</h2>
          <p className="up-email">{currentUser.email}</p>
          <p className="up-since">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>

          {editSuccess && <p className="up-success">Profile updated!</p>}

          {editMode ? (
            <form className="up-form" onSubmit={handleUpdateProfile}>
              <input
                className="up-input"
                type="text"
                placeholder="New display name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                autoFocus
              />
              <div className="up-row">
                <button type="submit" className="up-btn-primary">Save</button>
                <button type="button" className="up-btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <button
              className="up-btn-ghost"
              onClick={() => { setEditName(currentUser.name); setEditMode(true); }}
            >
              Edit Name
            </button>
          )}

          <hr className="up-divider" />
          <button className="up-btn-danger" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="up-overlay" onClick={onClose}>
      <div className="up-panel" onClick={e => e.stopPropagation()}>
        <button className="up-close" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="up-heading">My Account</h2>

        <div className="up-tabs">
          <button
            className={`up-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setLoginError(''); }}
          >Sign In</button>
          <button
            className={`up-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setRegError(''); }}
          >Create Account</button>
        </div>

        {tab === 'login' && (
          <form className="up-form" onSubmit={handleLogin}>
            {loginError && <p className="up-error">{loginError}</p>}
            <label className="up-label">Email</label>
            <input
              className="up-input"
              type="email"
              value={loginForm.email}
              onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
              required
            />
            <label className="up-label">Password</label>
            <input
              className="up-input"
              type="password"
              value={loginForm.password}
              onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
            <button type="submit" className="up-btn-primary">Sign In</button>
          </form>
        )}

        {tab === 'register' && (
          <form className="up-form" onSubmit={handleRegister}>
            {regError && <p className="up-error">{regError}</p>}
            <label className="up-label">Full Name</label>
            <input
              className="up-input"
              type="text"
              value={regForm.name}
              onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Jane Doe"
              required
            />
            <label className="up-label">Email</label>
            <input
              className="up-input"
              type="email"
              value={regForm.email}
              onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
              required
            />
            <label className="up-label">Password</label>
            <input
              className="up-input"
              type="password"
              value={regForm.password}
              onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))}
              placeholder="At least 6 characters"
              required
            />
            <label className="up-label">Confirm Password</label>
            <input
              className="up-input"
              type="password"
              value={regForm.confirm}
              onChange={e => setRegForm(p => ({ ...p, confirm: e.target.value }))}
              placeholder="••••••••"
              required
            />
            <button type="submit" className="up-btn-primary">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}
