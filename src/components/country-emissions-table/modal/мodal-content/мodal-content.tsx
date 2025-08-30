import { MODAL, TITLE_LEVELS } from '../../../../shared/constants/constants';
import { Title } from '../../../title/title';

type ModalContentProps = {
  onClose: () => void;
  onConfirm: () => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  existingColumns: string[];
};

export function ModalContent(props: ModalContentProps) {
  const {
    onClose,
    onConfirm,
    selectedColumns,
    setSelectedColumns,
    modalRef,
    existingColumns,
  } = props;

  const toggleColumn = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  return (
    <div
      ref={modalRef}
      className="relative bg-[var(--color-base-100)] p-4 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto text-[var(--color-base-content)] flex flex-col"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[var(--color-error-content)] font-bold text-lg cursor-pointer"
        aria-label={MODAL.CLOSE_BUTTON}
      >
        ✕
      </button>

      <Title level={TITLE_LEVELS.H1}>{MODAL.TITLE}</Title>

      <div className="flex flex-col gap-2 mb-4">
        {MODAL.COLUMNS.map((column) => (
          <label
            key={column}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              disabled={existingColumns.includes(column)}
              checked={selectedColumns.includes(column)}
              onChange={() => toggleColumn(column)}
            />
            {column}
          </label>
        ))}
      </div>

      <button
        onClick={onConfirm}
        className="mt-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-base-content)] rounded hover:bg-[var(--color-primary-content)] transition"
      >
        Add Columns
      </button>
    </div>
  );
}
