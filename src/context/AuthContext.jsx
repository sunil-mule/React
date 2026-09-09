import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'shoppy_users';
const SESSION_KEY = 'shoppy_current_user';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(loadSession);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [currentUser]);

  function register({ name, email, password }) {
    const users = loadUsers();
    if (users[email]) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const user = { name, email, createdAt: new Date().toISOString() };
    users[email] = { ...user, password };
    saveUsers(users);
    setCurrentUser(user);
    return { success: true };
  }

  function login({ email, password }) {
    const users = loadUsers();
    const found = users[email];
    if (!found) return { success: false, error: 'No account found with this email.' };
    if (found.password !== password) return { success: false, error: 'Incorrect password.' };
    const user = { name: found.name, email: found.email, createdAt: found.createdAt };
    setCurrentUser(user);
    return { success: true };
  }

  function logout() {
    setCurrentUser(null);
  }

  function updateProfile({ name }) {
    const users = loadUsers();
    if (!currentUser || !users[currentUser.email]) return;
    users[currentUser.email].name = name;
    saveUsers(users);
    const updated = { ...currentUser, name };
    setCurrentUser(updated);
  }

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
