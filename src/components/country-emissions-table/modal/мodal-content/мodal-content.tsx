import { useEffect } from 'react';
import { MODAL, TITLE_LEVELS } from '../../../../shared/constants/constants';
import { Button } from '../../../button/button';
import { Title } from '../../../title/title';

const FIRST_INDEX = 0;
const LAST_INDEX_OFFSET = 1;
const NO_ELEMENTS = 0;

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

  const toggleColumn = (columnName: string) => {
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(columnName)
        ? prevSelected.filter((selected) => selected !== columnName)
        : [...prevSelected, columnName]
    );
  };

  useEffect(() => {
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<
        HTMLButtonElement | HTMLInputElement
      >('button, input');

      if (focusable.length === NO_ELEMENTS) return;

      const first = focusable[FIRST_INDEX];
      const last = focusable[focusable.length - LAST_INDEX_OFFSET];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [modalRef]);

  return (
    <div
      ref={modalRef}
      className="relative bg-[var(--color-base-100)] p-4 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto text-[var(--color-base-content)] flex flex-col"
    >
      <Title level={TITLE_LEVELS.H2}>{MODAL.TITLE}</Title>

      <div className="flex flex-col gap-2 mb-4">
        {MODAL.COLUMNS.map((columnName) => {
          const isDisabled = existingColumns.includes(columnName);
          const isChecked = selectedColumns.includes(columnName);
          const handleCheckboxChange = () => toggleColumn(columnName);

          return (
            <label
              key={columnName}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                disabled={isDisabled}
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              {columnName}
            </label>
          );
        })}
      </div>

      <Button onClick={onConfirm}>{MODAL.CONFIRM_BUTTON}</Button>

      <Button
        onClick={onClose}
        aria-label={MODAL.CLOSE_BUTTON_ARIA}
        className="absolute top-4 right-4 "
      >
        {MODAL.CLOSE_BUTTON}
      </Button>
    </div>
  );
}
