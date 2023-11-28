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

export interface IDespesaCreate {
    nome: string;
    valor: string;
    data: string;
    status: boolean;
    contaCartaoId: string;
}

export interface IConta {
    tipo: string;
    atividade: boolean;
}

export interface ICartao {
    tipo: string;
    atividade: boolean;
}