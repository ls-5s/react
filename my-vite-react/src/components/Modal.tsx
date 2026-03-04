import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    // 最外层 div 仅用于控制显示/隐藏，不包含样式
    <div>
      {/* 内容区域，同样不包含样式，只作为内容的容器 */}
      <div>
        {title && <h2>{title}</h2>}
        <button onClick={onClose}>&times;</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
