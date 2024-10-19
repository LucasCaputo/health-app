export interface typeInterfaceResponse extends typeInterfaceRequest {
    id: number;
}

export interface typeInterfaceRequest {
    nome: string;
    categoria: string;
}

export type categoryType = 'CONSULTA' | 'EXAME' | 'TRANSPORTE';