interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm flex items-center justify-between">
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-red-500 hover:text-red-700 font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

