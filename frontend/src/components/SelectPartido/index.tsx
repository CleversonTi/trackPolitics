import React from 'react';
import styles from '@/components/styles/select/Select.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function SelectPartido({ value, onChange, options }: Props) {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>Partido</label>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todos</option>
        {options.map((partido) => (
          <option key={partido} value={partido}>
            {partido}
          </option>
        ))}
      </select>
    </div>
  );
}
