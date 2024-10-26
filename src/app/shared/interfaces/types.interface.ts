export interface typeInterfaceResponse extends typeInterfaceRequest {
    id: number;
}

export interface typeInterfaceRequest {
    nome: string;
    categoria: string;
    ativo: boolean;
}

export type categoryType = 'CONSULTA' | 'EXAME' | 'TRANSPORTE';