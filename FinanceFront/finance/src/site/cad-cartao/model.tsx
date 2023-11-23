export interface ICadCartao {
    id: string,
    nome: string;
    valorFatura: number;
    diaFechamento: string;
    diaVencimento: string;
    atividade: boolean;
    tipo: string,
}

export interface ICartaoCreate {
    nome: string;
    valorFatura: string;
    diaFechamento: string;
    diaVencimento: string;
    atividade: boolean;
    tipo: string,
}