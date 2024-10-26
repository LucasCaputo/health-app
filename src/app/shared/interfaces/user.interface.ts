export interface UserInterface {
    token: string;
    role: RoleType;
}

export type RoleType = 'ROLE_SECRETARIA' | 'ROLE_COMUM';