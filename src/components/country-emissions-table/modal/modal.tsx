import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { KEY_CODES } from '../../../shared/constants/constants';
import { ModalContent } from './мodal-content/мodal-content';

type ModalProps = {
  onClose: () => void;
  onAddColumns: (columns: string[]) => void;
  existingColumns: string[];
};

export function Modal({ onClose, onAddColumns, existingColumns }: ModalProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    onAddColumns(selectedColumns);
    handleClose();
  };

  const handleClose = useCallback(() => {
    setSelectedColumns([]);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEY_CODES.ESCAPE) handleClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-neutral)]/95 z-40">
      <div className="mt-16 w-full flex justify-center">
        <ModalContent
          onClose={handleClose}
          onConfirm={handleConfirm}
          modalRef={modalRef}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          existingColumns={existingColumns}
        />
      </div>
    </div>,
    document.body
  );
}
