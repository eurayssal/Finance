export interface ICadConta {
    id: string;
    nome: string;
    saldo: number;
    atividade: boolean;
    tipo: string
}

export interface IContaCreate {
    nome: string;
    tipo: string,
    saldo: string,
    atividade: boolean,
}
