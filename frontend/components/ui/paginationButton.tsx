import React from "react";

interface PaginationButtonProps {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  pageNumber,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive
          ? "z-10 bg-gray-200 border-gray-500 text-primary-700"
          : "bg-secondary border-gray-300 text-gray-500 hover:bg-gray-50"
      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
    >
      {pageNumber}
    </button>
  );
};

export default PaginationButton;
