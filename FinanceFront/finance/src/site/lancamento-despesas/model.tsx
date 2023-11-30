export interface IDespesa {
    id: string;
    nome: string;
    valor: number;
    data: string;
    status: boolean;
    cartaoId: string;
    cartaoName: string;
    contaId: string
    contaName: string
}

export interface IDespesaCreateInput {
    nome: string;
    valor: string;
    data: string;
    status: boolean;
    contaCartaoId: string;
}

export interface IDespesaCreateViewModel {
    nome: string;
    valor: number;
    data: string;
    status: boolean;
    contaCartaoId: string;
}

export interface IConta {
    id: string;
    tipo: string;
    atividade: boolean;
    nome: string;
}

export interface ICartao {
    id: string;
    tipo: string;
    atividade: boolean;
    nome: string;
}