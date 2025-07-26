import React from 'react';
import { Deputado } from '../types/deputado';

type DeputadoCardProps = {
  deputado: Deputado;
};

export default function DeputadoCard({ deputado }: DeputadoCardProps) {
  return (
    <li
      
    >
      <strong>{deputado.nome}</strong> ({deputado.sigla_partido} - {deputado.sigla_uf})
    </li>
  );
}