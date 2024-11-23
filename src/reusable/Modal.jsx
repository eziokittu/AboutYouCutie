import React from "react";

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-orange-100 border-4 border-orange-950 p-6 rounded-2xl shadow-lg text-center transform animate-bounce-scale"
      >
        <h2 className="text-xl font-bold mb-8 text-orange-950">{title}</h2>
        <p className="mb-6 text-black">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-950 text-white rounded-2xl transition"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default Modal;
