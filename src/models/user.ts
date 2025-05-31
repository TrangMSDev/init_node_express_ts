import { BaseEntity } from "./base";

export interface User extends BaseEntity{
    id: number;
    name: string;
    avatar?: string;
    email: string;
    password: string;
    verifyEmail: number;
    role: number;
}