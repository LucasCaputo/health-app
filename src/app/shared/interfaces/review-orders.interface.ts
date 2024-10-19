export interface ReviewOrderInterfaceResponse {
    id: number;
    servico: {
        id: number;
        nome: string;
        categoria: string;
    };
    status: string;
    observacao: string;
    protocolo: string;
    dataSolicitacao: string;
    dataConclusao: string;
    paciente: {
        id: number;
        nome: string;
        cpf: string;
        dataNascimento: string;
    };
    usuarioSolicitante: {
        id: number;
        nome: string;
        username: string;
        password: string;
        role: string;
        email: string;
        paciente: {
            id: number;
            nome: string;
            cpf: string;
            dataNascimento: string;
        };
        enabled: boolean;
        authorities: {
            authority: string;
        }[];
        accountNonLocked: boolean;
        accountNonExpired: boolean;
        credentialsNonExpired: boolean;
    };
}