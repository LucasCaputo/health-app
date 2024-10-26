export interface ReviewOrderInterfaceResponse {
    id: number;
    nomeServico: string;
    categoriaServico: string;
    status: string;
    protocolo: string;
    dataSolicitacao: Date;
    solicitante: string;
}