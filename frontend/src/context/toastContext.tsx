import React, { createContext, useContext, useReducer } from "react";

// === TOAST NOTIFICATIONS === //

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  autoDismiss?: number; // ms, null/undefined = persistent
}

type ToastAction = { type: "ADDED"; payload: Toast } | { type: "REMOVED"; payload: string };

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, autoDismiss?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const toastReducer = (state: { toasts: Toast[] }, action: ToastAction): { toasts: Toast[] } => {
  switch (action.type) {
    case "ADDED":
      return { toasts: [...state.toasts, action.payload] };
    case "REMOVED":
      return { toasts: state.toasts.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback(
    (message: string, type?: string, autoDismiss?: number) => {
      dispatch({
        type: "ADDED",
        payload: { id: Math.random().toString(36).substring(7), message, type: type || "info", autoDismiss },
      });
    },
    []
  );

  const removeToast = useCallback((id: string) => dispatch({ type: "REMOVED", payload: id }), []);
  const clearToasts = useCallback(() => dispatch({ type: "ADDED", payload: {} as Toast }), []);

  // Auto-dismiss timers
  React.useEffect(() => {
    const timers: number[] = [];
    state.toasts.forEach((t) => {
      if (t.autoDismiss && t.autoDismiss > 0) {
        timers.push(setTimeout(() => removeToast(t.id), t.autoDismiss * 1000));
      }
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [state.toasts, removeToast]);

  // Cleanup persistent toasts when unmounting
  React.useEffect(() => {
    return () => state.toasts.forEach((t) => t.autoDismiss && clearTimeout(setTimeout(() => {}, 0)));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, addToast, removeToast, clearToasts }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {state.toasts.map((t) => (
          <ToastItem key={t.id} toast={{ ...t, remove: removeToast }} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastIcon = ({ type }: { type?: ToastType }) => {
  if (!type) return <span className="w-1 h-1 bg-gray-400 rounded-full" />;

  const icons: Record<ToastType, React.ReactNode> = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 10c-.77 1.333.192 3 1.732 3z" /></svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  };

  return <span className="flex items-center gap-2">{icons[type as ToastType]}</span>;
};

const ToastItem = ({ toast }: { toast: Toast & { remove?: (id: string) => void } }) => {
  if (!toast.autoDismiss || toast.autoDismiss <= 0) {
    // persistent toast - close button only
    return (
      <div className="flex items-center gap-2 w-[380px] max-w-[calc(100%-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 p-4 pr-4">
        {toast.type && <span className={toast.type === "success" ? "text-green-600" : toast.type === "error" ? "text-red-600" : toast.type === "warning" ? "text-yellow-600" : "text-blue-600"}>{toast.type === 'warning' || toast.type === info ? '' : ''}<ToastIcon type={toast.type} /></span>}
        <p className="flex-1 text-sm text-gray-700 leading-relaxed">{toast.message}</p>
        {toast.remove && (
          <button onClick={() => toast.remove(toast.id)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="animate-slide-in flex items-center gap-2 w-[380px] max-w-[calc(100%-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 p-4 pr-4">
      <div className={toast.type === "success" ? "text-green-600" : toast.type === "error" ? "text-red-600" : toast.type === "warning" ? "text-yellow-600" : "text-blue-600"}><ToastIcon type={toast.type} /></div>
      <p className="flex-1 text-sm text-gray-700 leading-relaxed">{toast.message}</p>
      {toast.remove && (
        <button onClick={() => toast.remove(toast.id)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
};

export const { ToastProvider, ToastContext, useToast } = React;