export interface IReceita {
    id: string;
    nome: string;
    valor: number;
    data: string
}

export interface IReceitaCreate {
    nome: string;
    valor: string;
    data: string;
}
