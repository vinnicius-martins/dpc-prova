export interface ContatoType {
  nome: string;
  email: string;
  telefone: string;
  status: 'Ativo' | 'Inativo';
  empresaId: string;
}
