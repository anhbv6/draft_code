import type { ReactNode, CSSProperties } from "react";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  contentStyleCustom?: CSSProperties;
};

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const contentStyle: CSSProperties = {
  width: "320px",
  maxWidth: "90%",
  background: "#fff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  animation: "popupFade 0.2s ease",
};

const PopupMini = ({
  open,
  onClose,
  children,
  contentStyleCustom,
}: PopupProps) => {
  if (!open) return null;

  return (
    <>
      <style>
        {`
          @keyframes popupFade {
            from {
              opacity: 0;
              transform: scale(0.95);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>

      <div style={overlayStyle} onClick={onClose}>
        <div
          style={{
            ...contentStyle,
            ...contentStyleCustom,
        }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default PopupMini;