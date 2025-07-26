export type Despesa = {
  ano: number;
  mes: number;
  tipoDespesa: string;
  valorDocumento: number;
  fornecedor: string;
};

export type ApiDespesasResponse = {
  dados: Despesa[];
  total: number;
};
