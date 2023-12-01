export interface IReceita {
    id: string;
    nome: string;
    valor: number;
    data: string,
    contaId: string
    contaName: string
}

export interface IReceitaCreate {
    nome: string;
    valor: string;
    data: string;
    contaId: string
    contaName: string
}

export interface IConta {
    id: string;
    tipo: string;
    atividade: boolean;
    nome: string;
}