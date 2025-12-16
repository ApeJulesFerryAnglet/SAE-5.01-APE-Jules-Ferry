import { RoleUtilisateur } from "../../enums/RoleUtilisateur/role-utilisateur";

export interface Me {
    id: number;
    email:string;
    nom: string;
    role: RoleUtilisateur;
}
