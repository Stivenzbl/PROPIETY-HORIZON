import React, { createContext, useContext, useReducer } from "react";
import { Property } from "@/types";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

interface ButtonPropsAndKeys extends ButtonProps {
  key?: string;
  icon?: React.ReactNode;
}

interface ModalConfig {
  id: number;
  title: string;
  description?: string;
  content?: React.ReactNode | ((props?: any) => React.ReactNode);
  buttons?: Array<ButtonPropsAndKeys>;
}

interface ModalContextValue {
  showModal: (config: ModalConfig) => void;
  setModal: React.Dispatch<React.SetStateAction<ModalConfig | null>>;
  closeModal: (id?: number) => void;
  modal: ModalConfig | null;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modal, setModal] = React.useState<ModalConfig | null>(null);

  const showModal = React.useCallback(
    (config: ModalConfig) => {
      setModal(config);
    },
    []
  );

  const closeModal = React.useCallback(
    (id?: number) => {
      if (id !== undefined) {
        setModal((prev) => (prev && prev.id === id ? null : prev));
      } else {
        setModal(null);
      }
    },
    []
  );

  return (
    <ModalContext.Provider value={{ showModal, setModal, closeModal, modal }}>
      {children}
      {modal && <ModalDialog config={modal} onClose={() => closeModal(modal.id)} />}
    </ModalContext.Provider>
  );
};

const ModalDialog: React.FC<{ config: ModalConfig; onClose: () => void }> = ({ config, onClose }) => {
  const isConfirm = config.buttons?.length === 2 && config.buttons[0].variant === "danger";
  const primaryButton = config.buttons?.find((b) => b.variant !== "ghost" || b.variant === "primary");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl mx-4 sm:mx-auto ring-1 ring-gray-900/5 transition-all animate-modal-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
          {isConfirm && (
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {config.description ? (
          <p className="px-6 py-4 text-gray-600 leading-relaxed">{config.description}</p>
        ) : config.content ? (
          <div className="px-6 py-4">{config.content}</div>
        ) : null}

        {config.buttons && config.buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 p-6 pt-0 sm:items-center justify-end">
            {config.buttons.map((button) => (
              <button key={button.key} className="ActionButton py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const LoadingOverlay = ({ message = "Cargando..." }: { message?: string }) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-400/20 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3">
      <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4.636 10.071a10.018 10.018 0 0112.255-1.216C19.347 10.64 20.022 11.964 19.557 13.193c-7.227 1.488-15.392-.928-18.982-6.63.85-2.322 2.705-4.217 5.077-5.161a10.027 10.027 0 015.314.748l.446-.446c.306-.306.612-.612.918-.918z" />
      </svg>
      <p className="text-sm text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);

export const ToastContainer = ({ children }: React.PropsWithChildren) => {
  const ctx = React.useContext(ToastContext);
  return ctx ? <ToastProvider>{children}</ToastProvider> : null;
};

export { ModalContext, useModal, ModalProvider, ActionButton, LoadingOverlay };