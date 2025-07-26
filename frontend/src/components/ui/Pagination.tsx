import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false
}: PaginationProps) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: '24px',
      gap: '16px'
    }}>
      <button
        disabled={currentPage === 1 || disabled}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: currentPage === 1 ? '#cccccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1
        }}
      >
        Anterior
      </button>

      <span style={{ minWidth: '120px', textAlign: 'center' }}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages || disabled}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: currentPage === totalPages ? '#cccccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1
        }}
      >
        Próxima
      </button>
    </div>
  );
}