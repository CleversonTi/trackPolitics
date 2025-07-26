//frontend/src/types/deputado.ts
export type Deputado = {
  id: number;
  nome: string;
  sigla_partido: string;
  sigla_uf: string;
  url_foto: string;
  status: string;
};



export type ApiResponse = {
  data: Deputado[];
  current_page: number;
  last_page: number;
  total: number;
};
