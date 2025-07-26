import React from 'react';
import styles from '@/components/styles/SearchInput/SearchInput.module.scss';

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  disabled = false
}: SearchInputProps) {
  return (

     <div className={styles.inputContainer}>
      <label className={styles.label}>Nome</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
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
}