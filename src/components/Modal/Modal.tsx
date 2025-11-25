import { PropsWithChildren } from "react";
import "./Modal.css";

export default function Modal({
  isOpen,
  onClose,
  name,
  children,
}: PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}) {
  if (!isOpen) {
    return null;
  }

  const handleBackgroundClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-window">
        <div className="modal-header">
          <h2>{name}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
