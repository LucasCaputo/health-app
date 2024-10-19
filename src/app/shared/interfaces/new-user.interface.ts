export interface NewUserInterface {
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
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
}