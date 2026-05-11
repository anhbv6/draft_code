import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;

  onConfirm: () => void;
  onCancel: () => void;

  confirmText?: string;
  cancelText?: string;

  className?: string;
  overlayClassName?: string;

  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;

  confirmButtonStyle?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;

  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
};

export default function ConfirmModal({
  open,
  title = "Confirm",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  className = "",
  overlayClassName = "",
  style = {},
  overlayStyle = {},
  confirmButtonStyle = {},
  cancelButtonStyle = {},
  confirmButtonClassName = "",
  cancelButtonClassName = "",
}: ConfirmModalProps) {
  if (!open) return null;

  const styles: Record<string, React.CSSProperties> = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      ...overlayStyle,
    },
    box: {
      width: 400,
      background: "#fff",
      borderRadius: 10,
      padding: 20,
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      fontFamily: "Arial, sans-serif",
      ...style,
    },
    title: {
      margin: "0 0 10px",
      fontSize: 18,
      fontWeight: 600,
    },
    message: {
      marginBottom: 20,
      color: "#fff",
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
    },
    button: {
      padding: "8px 14px",
      border: "none",
      cursor: "pointer",
      borderRadius: 6,
      fontSize: 14,
    },
    cancel: {
      background: "#e0e0e0",
    },
    confirm: {
      background: "#1976d2",
      color: "#fff",
    },
  };

  return (
    <div
      className={overlayClassName}
      style={styles.overlay}
      onClick={onCancel}
    >
      <div
        className={className}
        style={styles.box}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>

        <div style={styles.actions}>
          <button
            className={cancelButtonClassName}
            style={{
              ...styles.button,
              ...styles.cancel,
              ...cancelButtonStyle,
            }}
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className={confirmButtonClassName}
            style={{
              ...styles.button,
              ...styles.confirm,
              ...confirmButtonStyle,
            }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}