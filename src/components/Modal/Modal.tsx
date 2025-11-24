import "./Modal.css";
import { PropsWithChildren } from "react";
import Button from "../Button/Button";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: PropsWithChildren & {
  isOpen: boolean;
  onClose: (...arg0: unknown[]) => void;
  title: string;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-background"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-window">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>

        <div className="modal-content">
          {children}
          <Button className="close-button" onClick={onClose} title="*" />
        </div>
      </div>
    </div>
  );
}
