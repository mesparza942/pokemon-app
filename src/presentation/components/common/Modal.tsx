interface ModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ id, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      data-testid={id}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-gray-700 rounded-lg p-8 shadow-lg flex flex-col items-center gap-4">
        <button
          data-testid="close-modal-btn"
          className="absolute top-2 right-5 text-gray-200 hover:text-gray-900 text-4xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
