//frontend/src/components/SelectUF/index.tsx
import React from 'react';
import styles from '@/components/styles/select/Select.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function SelectUF({ value, onChange, options }: Props) {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>UF</label>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas</option>
        {options.map((uf) => (
          <option key={uf} value={uf}>
            {uf}
          </option>
        ))}
      </select>
    </div>
  );
}
