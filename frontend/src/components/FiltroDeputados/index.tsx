//frontend/src/components/CardDeputado/index.tsx
import React from 'react';

import SelectPartido from '@/components/SelectPartido/';
import SelectUF  from '@/components/SelectUF/';


type Props = {
  partido: string;
  uf: string;
  partidos: string[];
  ufs: string[];
  onChange: (filtros: { partido: string; uf: string }) => void;
};

export default function FiltroDeputados({ partido, uf, partidos, ufs, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <SelectPartido
        value={partido}
        onChange={(value) => onChange({ partido: value, uf })}
        options={partidos}
      />
      <SelectUF
        value={uf}
        onChange={(value) => onChange({ partido, uf: value })}
        options={ufs}
      />
    </div>
  );
}