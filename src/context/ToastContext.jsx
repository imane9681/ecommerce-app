import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success', duration: 2200 });
  const [timerId, setTimerId] = useState(null);

  const hide = useCallback(() => setToast((t) => ({ ...t, visible: false })), []);

  const showToast = useCallback((message, options = {}) => {
    const { type = 'success', duration = 2200 } = options;
    // Clear previous timer if any
    if (timerId) {
      clearTimeout(timerId);
    }
    setToast({ visible: true, message, type, duration });
  }, [timerId]);

  useEffect(() => {
    if (!toast.visible) return;
    const id = setTimeout(() => hide(), toast.duration);
    setTimerId(id);
    return () => clearTimeout(id);
  }, [toast, hide]);

  const bg = toast.type === 'success' ? '#2ba972' : toast.type === 'error' ? '#e45858' : '#333';

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast UI */}
      <div
        style={{
          position: 'fixed',
          bottom: toast.visible ? 24 : -80,
          right: 24,
          transition: 'bottom 250ms ease, opacity 250ms ease',
          opacity: toast.visible ? 1 : 0,
          zIndex: 9999,
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          style={{
            minWidth: 260,
            maxWidth: 420,
            background: bg,
            color: '#fff',
            padding: '12px 14px',
            borderRadius: 10,
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 22,
              height: 22,
              borderRadius: 6,
              background: '#ffffff22',
              fontSize: 14,
            }}
            aria-hidden
          >
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '!' : 'i'}
          </span>
          <span style={{ lineHeight: 1.3 }}>{toast.message}</span>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
