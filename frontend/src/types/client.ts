import { ContabilidadeType } from './contabilidade';
import { ContatoType } from './contato';

export interface ClientType {
  codigo: string;
  nome: string;
  sistemaId: string;
  dataInicio: string;
  vip: boolean;
  necessitaTI: boolean;
  necessitaMarketing: boolean;
  moedaEstrangeira: boolean;
  contatos: ContatoType[];
  contabilidades: ContabilidadeType[];
  ativo: boolean;
}

export const initialClient = {
  codigo: '',
  nome: '',
  sistemaId: '',
  dataInicio: '',
  vip: false,
  necessitaTI: false,
  necessitaMarketing: false,
  moedaEstrangeira: false,
  contatos: [],
  contabilidades: [],
  ativo: true,
};

// export interface ClientType {
//   code: number;
//   name: string;
//   systemId: string;
//   startDate: string;
//   vip: boolean;
//   needsIT: boolean;
//   needsMarketing: boolean;
//   foreignCurrency: boolean;
//   contacts: ContatoType[];
//   accountings: ContabilidadeType[];
//   active: boolean;
// }
