// frontend/src/components/ui/SearchInput/SearchInput.tsx
import React from 'react';
import styles from '@/components/styles/SearchInput/SearchInput.module.scss';

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Buscar por nome...',
  disabled = false
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="searchInput" className={styles.label}>
        Nome
      </label>
      <input
      id="busca"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete="off"
      style={{ 
        padding: '10px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
      }}
    />
    </div>
  );
};

export default React.memo(SearchInput);
