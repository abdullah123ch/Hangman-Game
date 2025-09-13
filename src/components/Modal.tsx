import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

function Modal({ isOpen, onClose, title, children, showCloseButton = true }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{title}</h2>
        <div className="modal-content">
          {children}
        </div>
        {showCloseButton && (
          <Button
            onClick={onClose}
            className="modal-close-button"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
}

export default Modal;